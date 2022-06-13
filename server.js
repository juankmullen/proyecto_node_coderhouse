const express = require('express')
const app = express()

const carroRouter = require('./src/routes/carroRouter')
const productoRouter = require('./src/routes/productoRouter')
const mensajeRouter = require('./src/routes/mensajeRouter')
const carroProducto = require('./src/routes/carroProductoRouter')
let port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/carrito',carroRouter)
app.use('/api/carro',carroProducto)
app.use('/api/productos',productoRouter)
app.use('/api/mensajes',mensajeRouter)

app.listen(port,()=>{
  console.log(`Server corriendo en el puerto ${port}`)
})

