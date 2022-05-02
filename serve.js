const { application } = require('express')
const express = require('express')
const { Router } = express

const ProductoController = require('./controllers/ProductoController')


const app       = express()
const router    = Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))



let LogicProductos = new  ProductoController(); 

// todos los productos
router.get('/',(req,res)=>{
    res.send(LogicProductos.store())
})

router.get('/all',(req,res)=>{
    res.send(LogicProductos.getProductos())
})



app.use('/api/productos',router)




app.listen(8080)