const express = require('express')
const app = express()
const carroRouter = require('./src/routes/carro')
const productoRouter = require('./src/routes/producto')
let port = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/carrito',carroRouter)
app.use('/api/productos',productoRouter)

app.listen(port,()=>{
  console.log(`Server corriendo en el puerto ${port}`)
})

