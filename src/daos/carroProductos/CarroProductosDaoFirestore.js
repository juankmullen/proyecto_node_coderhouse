const {ProductosDao } = require('../productos/ProductosDaoFirestore')
const productoDao = new ProductosDao();

const {CarrosDao } = require('../carros/CarrosDaoFirestore')
const carrosDao = new CarrosDao();



class CarroProductosDao
{
    

    async addProduct(id_product, id_carro)
    {
        let products  = []
        let producto = await productoDao.getDoc(id_product)

        if(producto == 0)
            return {'msj':'Producto inexistente'}

        let  carro = await carrosDao.getDoc(id_carro);
        
        if(carro == 0)
            return {'msj':'Carro inexistente'}


        if(carro.productos)
        {
            products.push(carro.productos)
            products.push(producto)
        }else
            products = producto

        return await carrosDao.setProductCarro(id_carro,{productos:products})
        
    }

}


module.exports = {CarroProductosDao}