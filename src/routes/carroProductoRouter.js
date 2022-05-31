const express = require('express')
const {Router} = express
const carroProducto = Router()


let rutaCarroProduct = '../daos/carroProductos/CarroProductosDaoFirestore';

if(process.env.CONTAINER == 'MONGO')
    rutaCarroProduct = '../daos/carroProductos/CarroProductosDaoMongo'

const {CarroProductosDao } = require(rutaCarroProduct)
const carroProductosDao = new CarroProductosDao();


// get /:id
carroProducto.post('/:id_carro/productos/:id_product', async (req,res)=>{
    let carro =  await carroProductosDao.addProduct(req.params.id_product,req.params.id_carro)
    
    res.json({carro})
})



module.exports = carroProducto;