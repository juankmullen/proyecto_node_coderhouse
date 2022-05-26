const { application } = require('express')
const express = require('express')
const { Router } = express
const admin = require("firebase-admin");

//firebase 
const serviceAccount = require("./db/serviceAccountKey.json");
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
const db                    = admin.firestore();
const carroCollection       = db.collection('carro');
let docCarro                = carroCollection.doc();
const productoCollection    = db.collection('producto');
let docProducto             = productoCollection.doc();

// Controladores
const ProductoController = require('./controllers/ProductoController')
const CarroController = require('./controllers/CarroController')

const app               = express()
const routerProducto    = Router()
const routerCarro       = Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let LogicProductos = new  ProductoController();
let LogicCarros = new  CarroController(docCarro);


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

//crear carro
routerCarro.post('/',(req,res)=>{
    res.send(LogicCarros.store())
})

// eliminar carro
routerCarro.delete('/:id',(req,res)=>{
    res.send(LogicCarros.deleteCarro(req.params.id))
})

//get productos de carro especifico
routerCarro.get('/:id/productos',(req,res)=>{
    res.send(LogicCarros.getCarroProductos(req.params.id))
})

//set carro producto
routerCarro.post('/:id/productos/:id_prod',(req,res)=>{
    res.send(LogicCarros.setCarroProductos(req.params.id,req.params.id_prod))
})

routerCarro.delete('/:id/productos/:id_prod',(req,res)=>{
    res.send(LogicCarros.deleteCarroProductos(req.params.id,req.params.id_prod))
})


app.use('/api/productos',routerProducto)
app.use('/api/carrito',routerCarro)




app.listen(8080)
