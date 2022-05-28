const express = require('express')
const app = express()
const carroRouter = require('./src/routes/carro')
let port = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/carrito',carroRouter)

app.listen(port,()=>{
  console.log(`Server corriendo en el puerto ${port}`)
})

