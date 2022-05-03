const { application } = require('express')
const express = require('express')
const { Router } = express

// Controladores
const listProductos = []

const ProductoController = require('./controllers/ProductoController')


const app       = express()
const router    = Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))



let LogicProductos = new  ProductoController();

// todos los productos
router.post('/',(req,res)=>{
    res.send(LogicProductos.store(req.body.title,
                                  req.body.price,
                                  req.body.foto,
                                  req.body.descripcion,
                                  req.body.codigo,
                                  req.body.stock))
})

router.get('/:id',(req,res)=>{
    res.send(LogicProductos.getProducto(req.params.id))
})

router.delete('/:id',(req,res)=>{
    res.send(LogicProductos.deleteProducto(req.params.id))
})

router.get('/',(req,res)=>{
    res.send(LogicProductos.getProductos())
})



app.use('/api/productos',router)




app.listen(8080)
