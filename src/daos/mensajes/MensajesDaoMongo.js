
ruta = '../../contenedores/ContainerMongo'

const {Container} = require(ruta)  

const {mensajes} = require('../../../models/Mensajes')

const {schema,normalize,denormalize } = require('normalizr')
const util = require('util')

class MensajesDao extends Container
{

    async save(info)
    {
        let  hora       = info.hora;
        let  nombre     = info.nombre;
        let  apellido   = info.apellido;
        let  alias      = info.alias;
        let  msj        = info.msj;
        let  email      = info.email;
        let  id_author  = info.id_author;

        let mensaje = {
            author : 
            {
                id: id_author,
                nombre: nombre,
                apellido: apellido,
                alias: alias,
                email: email,
            },
        text : msj,
        time: hora,
    }
    console.log(mensaje)

        return await super.save(mensajes,mensaje)
    }

  
    async getAll()
    {
        let msj             = await  super.getAll(mensajes)

        let  data =  msj.map((doc) => ({
            id          : doc._id,
            text        : doc.text,
            time        : doc.time,
            author : {
                id          : doc.author.id,
                nombre      : doc.author.nombre,
                apellido    : doc.author.apellido,
                edad        : doc.author.edad,
                alias       : doc.author.alias,
                email       : doc.author.email,
                time        : doc.time,

            },
        }));

        
        const autor         = new schema.Entity('autor')
        const texto         = new schema.Entity('texto')

        const mss       = new schema.Entity('chat',{
            author  : autor,
        })

        const normalizedDta = normalize(data,[mss]) 

        //return msj
        return {'normalizedDta':normalizedDta,'result':msj}
    }
    
}


module.exports = {MensajesDao}