const {Container} = require('../../contenedores/ContainerFirestore')
const {schema,normalize,denormalize } = require('normalizr')


class MensajesDao extends Container
{
    constructor(){
        super('mensajes');
    }

    async getAll()
    {
        let result = await super.getAll()
        
        let data =  result.docs.map((doc) => ({
            id          : doc.id,
            author : {
                id          : doc.data().author.id,
                nombre      : doc.data().author.nombre,
                apellido    : doc.data().author.apellido,
                alias       : doc.data().author.alias,
                email       : doc.data().author.email,
                time        : doc.data().author.time,
            },
            text        : doc.data().text,
            time        : doc.data().time,

        }));

        const autor         = new schema.Entity('autor')

        const mss       = new schema.Entity('chat',{
            author  : autor,
        })

        const normalizedDta = normalize(data,[mss]) 

        //return msj
        return {'normalizedDta':normalizedDta,'result':result}



    }

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


        return await super.save(mensaje)
    }

}
  


module.exports = {MensajesDao}