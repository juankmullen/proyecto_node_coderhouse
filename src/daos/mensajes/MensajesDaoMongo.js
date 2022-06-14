const moment = require('moment')

ruta = '../../contenedores/ContainerMongo'

const {Container} = require(ruta)  

const {mensajes} = require('../../../models/Mensajes')

const {schema,normalize,denormalize } = require('normalizr')
const util = require('util')

class MensajesDao extends Container
{

    async save(id_author,nombre,apellido,edad,alias,avatar,text)
    {
        let mensaje = {
            author : 
            {
                id: id_author,
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                alias: alias,
                avatar: avatar,
                text: text,
            },
        text : text}

        return await super.save(mensajes,mensaje)
    }

  
    async getAll()
    {
        let msj             = await  super.getAll(mensajes)

        let  data =  msj.map((doc) => ({
            id          : doc._id,
            text        : doc.text,
            author : {
                id          : doc.author.id,
                nombre      : doc.author.nombre,
                apellido    : doc.author.apellido,
                edad        : doc.author.edad,
                alias       : doc.author.alias,
                avatar      : doc.author.avatar,
            },
        }));
        
        const autor         = new schema.Entity('autor')
        const texto         = new schema.Entity('texto')

        const mss       = new schema.Entity('chat',{
            author  : autor,
        })

        const normalizedDta = normalize(data,[mss]) 

        //return msj
        return normalizedDta
    }
    
}


module.exports = {MensajesDao}