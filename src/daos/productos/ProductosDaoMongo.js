const moment = require('moment')

ruta = '../../contenedores/ContainerMongo'

const {Container} = require(ruta)  

const {productos} = require('../../../models/Producto')



class ProductosDao extends Container
{

    async save(title,price,foto,descripcion,codigo,stock)
    {
        let timestamp = moment().format('YYYY-MM-DD HH:mm:s');
		const producto = {
            'title'         : title,
            'price'         : price,
            'foto'          : foto,
            'descripcion'   : descripcion,
            'codigo'        : codigo,
            'stock'         : stock,
            'timestamp'         : timestamp,
        }
        return super.save(productos,producto);
    }

    async getDoc(id)
    {
        let info =  await super.get(productos,id)
        return info;
    }

    async getAll()
    {
        return super.getAll(productos)
    }

     async delete(id)
     {
         return super.delete(productos,id)
     }

    
}


module.exports = {ProductosDao}