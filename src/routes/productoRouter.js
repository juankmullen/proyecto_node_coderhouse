const express = require('express')
const {Router} = express
const productoRouter = Router()

require('dotenv').config()

let ruta = '../daos/carros/ProductosDaoFirestore'

if(process.env.CONTAINER == 'MONGO')
     ruta = '../daos/productos/ProductosDaoMongo'


const {ProductosDao } = require(ruta)


const productoDao = new ProductosDao();


// get /:id
productoRouter.get('/:id', async (req,res)=>{
    let productos =  await productoDao.getDoc(req.params.id)
    
    res.json({'productos': productos})
})

// get all carros
productoRouter.get('/', async (req,res)=>{
    let productos =  await productoDao.getAll()
    
    res.json({'productos': productos})
})

productoRouter.post('/', async (req,res)=>{
    res.send(await productoDao.save(
        req.body.title,
        req.body.price,
        req.body.foto,
        req.body.descripcion,
        req.body.codigo,
        req.body.stock))
})

// delete producto
productoRouter.delete('/:id', async (req,res)=>{
    let productos =  await productoDao.delete(req.params.id)
    
    res.json({'productos': productos})
})



module.exports = productoRouter;