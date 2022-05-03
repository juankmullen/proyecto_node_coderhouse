const { application } = require('express')
const express = require('express')
const { Router } = express

// Controladores
const listProductos = []

const ProductoController = require('./controllers/ProductoController')
const CarroController = require('./controllers/CarroController')


const app               = express()
const routerProducto    = Router()
const routerCarro       = Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))



let LogicProductos = new  ProductoController();
let LogicCarros = new  CarroController();


//logica productos
routerProducto.put('/',(req,res)=>{
    res.send(LogicProductos.update( req.body.id,
                                    req.body.title,
                                    req.body.price,
                                    req.body.foto,
                                    req.body.descripcion,
                                    req.body.codigo,
                                    req.body.stock))
})

routerProducto.post('/',(req,res)=>{
    res.send(LogicProductos.store(req.body.title,
                                  req.body.price,
                                  req.body.foto,
                                  req.body.descripcion,
                                  req.body.codigo,
                                  req.body.stock))
})

routerProducto.get('/:id',(req,res)=>{
    res.send(LogicProductos.getProducto(req.params.id))
})

routerProducto.delete('/:id',(req,res)=>{
    res.send(LogicProductos.deleteProducto(req.params.id))
})

routerProducto.get('/',(req,res)=>{
    res.send(LogicProductos.getProductos())
})

// Logica Carros
routerCarro.post('/',(req,res)=>{
    res.send(LogicCarros.store())
})

routerCarro.delete('/:id',(req,res)=>{
    res.send(LogicCarros.deleteCarro(req.params.id))
})


app.use('/api/productos',routerProducto)
app.use('/api/carrito',routerCarro)




app.listen(8080)
