const express = require('express')
const pug = require('pug')

let LogicaApi = require('./LogicaApi.js')
let HandleFiles = require('./HandleFiles.js')

let { Server : HttpServer }   = require('http')
let { Server : IOServer }   = require('socket.io')


const app = express()
app.set('view engine','pug')
app.use(express.static('public'))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

let logic   = new  LogicaApi(); 
let file    = new  HandleFiles(); 

app.post('/',(req,res)=>{

    res.render("confirm",{
    ruta                : '/productos/',
    nm_button           : 'Ver Productos'})
})

app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.render('index')
})

io.on('connection',(socket)=>{
    socket.emit('mi mensaje',logic.getProductos())
    socket.emit('chat_a_cliente',file.getAll())

    socket.on('notificacion',(nodo)=>
    {
        logic.store(nodo)
        io.sockets.emit('mi mensaje',logic.getProductos())
    })

    socket.on('chat',(nodo)=>
    {
        console.log(nodo)
        file.save(nodo)
        io.sockets.emit('chat_a_cliente',file.getAll())
    })

})





httpServer.listen(3000)