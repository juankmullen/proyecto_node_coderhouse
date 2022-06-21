const express = require('express')
const pug = require('pug')
require('dotenv').config()
const  { faker } = require('@faker-js/faker');
const session = require('express-session')
const MongoStore = require('connect-mongo')
let { Server : HttpServer }   = require('http')
let { Server : IOServer }   = require('socket.io')

const app = express()
app.set('view engine','pug')
app.use(express.static('./public'))

app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/sesiones',ttl:60}),
  secret: 'coderhouse',
  autoRemove: 'native',
  resave: false,
  saveUninitialized: false,
  
}))

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

function checkAuth(req, res, next) {
  console.log(req.session)
  if(req.session?.admin) {
      return next();
  }

  return res.status(401).send('Usted no tiene permisos')
}

app.get('/privado', checkAuth, (req, res) => {
  res.send('pagina logueado para admin')
})


app.get('/',(req,res)=>{
  res.render('index',{root: __dirname})
})


app.get('/logout', (req, res) => {
  req.session.destroy( error => {
      if (error) {
          res.send({status: 'Logout Error', body: error})
      }
  })

  res.send('Usted ha cerrado sesion')
})

app.get('/login', (req, res) => {
  const { username, password } = req.query

  // Validacion de login (deberia hacerse comparando con informacion de base de datos)
  if(username == 'coderhouse' && password == 'coder2022') {
      req.session.user = username;
      req.session.admin = true;
      req.session.logged = true;
  } else if(username == 'ameliendrez' && password == 'coder2022') {
      req.session.user = username;
      req.session.logged = true;
  } else {
      return res.send('Usuario o contraseña incorrecto')
  }


  return res.send('Login success')
})

async function  getMensajes()
{
  let mensajes = await mensajeDao.getAll()
  console.log(mensajes)

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
