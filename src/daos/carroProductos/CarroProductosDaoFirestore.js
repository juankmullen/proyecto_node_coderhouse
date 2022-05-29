
const {ProductosDaoFirestore } = require('../productos/ProductosDaoFirestore')
const productoDaoFirestore = new ProductosDaoFirestore();

const {CarrosDaoFirestore } = require('../carros/CarrosDaoFirestore')
const carrosDaoFirestore = new CarrosDaoFirestore();



class CarroProductosDaoFirestore 
{
    async addProduct(id_product, id_carro)
    {
        let products  = []
        let producto = await productoDaoFirestore.getDoc(id_product)

        if(producto == 0)
            return {'msj':'Producto inexistente'}

        let  carro = await carrosDaoFirestore.getDoc(id_carro);
        
        if(carro == 0)
            return {'msj':'Carro inexistente'}


        if(carro.productos)
        {
            products.push(carro.productos)
            products.push(producto)
        }else
            products = producto

        return await carrosDaoFirestore.setProductCarro(id_carro,{productos:products})
        
    }

}


module.exports = {CarroProductosDaoFirestore}