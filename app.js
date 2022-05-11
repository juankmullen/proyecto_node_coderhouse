const express = require('express')
const pug = require('pug')

let LogicaApi = require('./LogicaApi.js')
let HandleFiles = require('./HandleFiles.js')
let InsertMensajes = require('./bd/insertMensajes')
let insertProductos = require('./bd/insertProductos')

let { Server : HttpServer }   = require('http')
let { Server : IOServer }   = require('socket.io')


const app = express()
app.set('view engine','pug')
app.use(express.static('public'))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

let logic                  = new  LogicaApi(); 
let file                   = new  HandleFiles(); 
let messages               = new  InsertMensajes(); 
let products               = new  insertProductos(); 


app.post('/',(req,res)=>{

    res.render("confirm",{
    ruta                : '/productos/',
    nm_button           : 'Ver Productos'})
})

app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.render('index')
})

io.on('connection',async (socket)=>{

    let mensajes =  await messages.selectMensajes();
    let productos = await products.selectProductos()
    
    socket.emit('mi mensaje',productos)

    socket.emit('chat_a_cliente',mensajes)

    socket.on('notificacion',async(nodo)=>
    {
        products.insertProducto(nodo)
        let productos = await products.selectProductos()
        io.sockets.emit('mi mensaje',productos)
    })

    socket.on('chat', async(nodo)=>
    {
        await messages.insertMensaje(nodo)
        let mensajes =  await messages.selectMensajes();
        io.sockets.emit('chat_a_cliente',mensajes)
    })

})





httpServer.listen(3000)