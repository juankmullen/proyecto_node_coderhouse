const express = require('express')
const pug = require('pug')

let { Server : HttpServer }   = require('http')
let { Server : IOServer }   = require('socket.io')

const app = express()
app.set('view engine','pug')
app.use(express.static('./public'))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)



const carroRouter = require('./src/routes/carroRouter')
const productoRouter = require('./src/routes/productoRouter')
const mensajeRouter = require('./src/routes/mensajeRouter')
const carroProducto = require('./src/routes/carroProductoRouter')
let port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('./public'))

app.get('/',(req,res)=>{
  res.render('index',{root: __dirname})
})


app.use('/api/carrito',carroRouter)
app.use('/api/carro',carroProducto)
app.use('/api/productos',productoRouter)
app.use('/api/mensajes',mensajeRouter)


io.on('connection',(socket)=>{
  console.log('Usuario Conectado')
  socket.emit('mi mensaje','Hola nuevo usuario')

  socket.on('notificacion',(info)=>{
      console.log(info)
  })

  socket.on('mensaje',(info)=>{
  io.sockets.emit('mi mensaje',info)


  })
})


httpServer.listen(port)
