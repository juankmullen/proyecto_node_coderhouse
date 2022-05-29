const express = require('express')
const {Router} = express
const carroProducto = Router()

const {CarroProductosDaoFirestore } = require('../daos/carroProductos/CarroProductosDaoFirestore')
const carroProductoDaoFirestore = new CarroProductosDaoFirestore();




// get /:id
carroProducto.post('/:id_carro/productos/:id_product', async (req,res)=>{
    console.log(req.params)
    let carro =  await CarroProductosDaoFirestore.addProduct(req.params.id_product,req.params.id_carro)
    
    res.json({carro})
})



module.exports = carroProducto;