const express = require('express')
const {Router} = express
const productoRouter = Router()

const {ProductosDaoFirestore } = require('../daos/productos/ProductosDaoFirestore')
const productoDaoFirestore = new ProductosDaoFirestore();


// get /:id
productoRouter.get('/:id', async (req,res)=>{
    let productos =  await productoDaoFirestore.getDoc(req.params.id)
    
    res.json({'productos': productos})
})

// get all carros
productoRouter.get('/', async (req,res)=>{
    let productos =  await productoDaoFirestore.getAll()
    
    res.json({'productos': productos})
})

productoRouter.post('/', async (req,res)=>{
    res.send(await productoDaoFirestore.save(
        req.body.title,
        req.body.price,
        req.body.foto,
        req.body.descripcion,
        req.body.codigo,
        req.body.stock))
})



module.exports = productoRouter;