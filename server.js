require('dotenv').config()
const express = require('express')
require('dotenv').config()
const session = require('express-session')
const MongoStore = require('connect-mongo')
let { Server : HttpServer }   = require('http')
let { Server : IOServer }   = require('socket.io');

const app = express()
app.set('view engine','pug')
app.use(express.static('./public'))


app.use(session({
  store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`,ttl:60}),
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
  if(req.session?.logged) {
      return next();
  }

  res.render('login',{msj: 'Usted no tiene permisos'})
}




app.get('/',(req,res)=>{
 // res.render('index',{root: __dirname})
  res.render('login',{msj: 'Ingresar Usuario'})
})

app.get('/index',checkAuth,(req,res)=>{
  let username = req.query.username
  res.render('index',{username: username})

 })


app.get('/logout', (req, res) => {
  if(req.session.user)
  {
    let name = req.session.user
    req.session.destroy()
    res.render('login',{msj: 'Sesión Finalizada, hasta luego : '+name})
  }
})

app.post('/login',(req, res) => {
  let username  = req.body.username

  if(username == 'JUANCARLOS'  ) {
      req.session.user = username;
      req.session.logged = true;
      res.redirect('/index?username='+username);
  } else 
      res.render('login',{msj: 'Usuario o contraseña incorrecto'})

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



/*io.on('connection', async (socket)=>{

  let mensajes = await getMensajes()

  socket.emit('mi mensaje',mensajes)

  socket.on('chat',async (info)=>{
    await mensajeDao.save(info)
    let mensajes = await getMensajes()
    io.sockets.emit('mi mensaje',mensajes)
    
  })

  socket.on('mensaje',async(info)=>{
  

  })
}) */


httpServer.listen(port)
