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
                edad        : doc.data().author.edad,
                alias       : doc.data().author.alias,
                avatar      : doc.data().author.avatar,
            },
            text        : doc.data().text,
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

        return await super.save(mensaje)
    }

}
  


module.exports = {MensajesDao}