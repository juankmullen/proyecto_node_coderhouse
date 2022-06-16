const express = require('express')
const pug = require('pug')
require('dotenv').config()
const  { faker } = require('@faker-js/faker');

let { Server : HttpServer }   = require('http')
let { Server : IOServer }   = require('socket.io')

const app = express()
app.set('view engine','pug')
app.use(express.static('./public'))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

let port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('./public'))


let ruta = './src/daos/mensajes/MensajesDaoFirestore'

if(process.env.CONTAINER == 'MONGO')
     ruta = './src/daos/mensajes/MensajesDaoMongo'


const {MensajesDao } = require(ruta)

const mensajeDao = new MensajesDao();

app.get('/',(req,res)=>{
  res.render('index',{root: __dirname})
})

app.get('/api/productos/test',(req,res)=>{

  let productos = [];

    for (let index = 0; index < 5; index++) {
        let nodo = {
            name : faker.commerce.productName(),
            price : faker.commerce.price(100,10000),
            foto : faker.image.imageUrl(),
            descripcion : faker.lorem.text(),
            codigo : faker.random.alphaNumeric(4),
            stock :faker.random.numeric(3),
            id : index
        }

        productos.push(nodo);
        
    }

  
  res.send({'productos':productos})
})

async function  getMensajes()
{
  let mensajes = await mensajeDao.getAll()

  normalizado = mensajes.normalizedDta
  sin_normalizar = mensajes.result

  let len_normalizado     = JSON.stringify(normalizado).length
  let len_sin_normalizado = JSON.stringify(sin_normalizar).length

  let porc = await Math.round((len_normalizado/len_sin_normalizado)*100)+' %'

  return {'normalizado':normalizado,'porc':porc}
}



io.on('connection', async (socket)=>{

  let mensajes = await getMensajes()

  socket.emit('mi mensaje',mensajes)

  socket.on('chat',async (info)=>{
    await mensajeDao.save(info)
    let mensajes = await getMensajes()
    io.sockets.emit('mi mensaje',mensajes)
    
  })

  socket.on('mensaje',async(info)=>{
  

  })
})


httpServer.listen(port)
