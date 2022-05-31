require('dotenv').config()
const {ProductosDaoFirestore } = require('../productos/ProductosDaoFirestore')
const productoDaoFirestore = new ProductosDaoFirestore();


let rutaProduct = '../productos/ProductosDaoFirestore';
let rutaCarro   = '../carro/CarrosDaoFirestore';

if(process.env.CONTAINER == 'MONGO')
    {
        rutaProduct = '../productos/ProductosDaoMongo'
        rutaCarro = '../carros/CarrosDaoMongo'
    }

const {CarrosDao} = require(rutaCarro)
const carrosDao = new CarrosDao();

const {ProductosDao} = require(rutaProduct)
const productoDao = new ProductosDao();



class CarroProductosDao
{
    constructor()
    {

    }

    async addProduct(id_product, id_carro)
    {
        let products  = []
        let producto = await productoDao.getDoc(id_product)

        if(producto == null)
            return {'msj':'Producto inexistente'}

        let  carro = await carrosDao.getDoc(id_carro);
        
        if(carro == null)
            return {'msj':'Carro inexistente'}


        if(carro.productos !== null)
        {
            products.push(carro.productos)
            products.push(producto)
        }else
            products.push(producto)


        return await carrosDao.setProductCarro(id_carro,{productos:products})
        
    }

}


module.exports = {CarroProductosDao}