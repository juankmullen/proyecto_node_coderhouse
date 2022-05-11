const express = require('express')
const pug = require('pug')

let LogicaApi = require('./LogicaApi.js')
let HandleFiles = require('./HandleFiles.js')
let InsertMensajes = require('./bd/insertMensajes')

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

app.post('/',(req,res)=>{

    res.render("confirm",{
    ruta                : '/productos/',
    nm_button           : 'Ver Productos'})
})

app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.render('index')
})

io.on('connection',async(socket)=>{

    socket.emit('mi mensaje',logic.getProductos())
    socket.emit('chat_a_cliente',await messages.selectMensajes())

    socket.on('notificacion',(nodo)=>
    {
        logic.store(nodo)
        io.sockets.emit('mi mensaje',logic.getProductos())
    })

    socket.on('chat', (nodo)=>
    {
        messages.insertMensaje(nodo)
        io.sockets.emit('chat_a_cliente',messages.selectMensajes())
    })

})





httpServer.listen(3000)