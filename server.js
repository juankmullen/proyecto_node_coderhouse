require('dotenv').config()
let port = process.env.PORT
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({port:8080}).argv
const numCPUs = require('os').cpus().length
const compression = require('compression');

const {loggerInfo,loggWarn,loggError} = require('./src/utils/logger')
const express = require('express')
const flash = require('connect-flash');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const MongoStore = require('connect-mongo')
let { Server : HttpServer }   = require('http')
let { Server : IOServer }   = require('socket.io');
const randomRouter      = require('./src/routes/randomsRouter')

const {fork} = require('child_process');
const forked = fork('app/computo.js')

port = args.port


//modelos mongo
const UserModel = require('./models/usuarios');

//ruta login
const auth = require('./src/routes/auth')

const app = express()
app.use(compression())
app.set('view engine','pug')
//app.use(express.static('./public'))

const {createHash,validatePass} = require('./src/utils/functions_bcrypt')

app.use(session({
  store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`,ttl:process.env.DURATION_SESSION}),
  secret: 'coderhouse',
  autoRemove: 'native',
  resave: false,
  saveUninitialized: false,
  
}))

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.use(express.static('./public'))

passport.use('login', new LocalStrategy(
  {passReqToCallback: true},(req,username, password, callback) => {
      UserModel.findOne({ username: username }, (err, user) => {
          if (err) {
              return callback(err)
          }

          if (!user) {
              let msj = 'No se encontro usuario';
              return callback(null, false,req.flash('signMessage', msj))
          }

          if(!validatePass(user, password)) {
              let msj = 'Contraseña Invalida';
              return callback(null, false,req.flash('signMessage', msj))
          }

          return callback(null, user)
      })
  }
))

passport.use('signup', new LocalStrategy(
  {passReqToCallback: true}, (req, username, password, callback) => {
      UserModel.findOne({ username: username }, (err, user) => {
          if (err) {
              return callback(err)
          }

          if (user) {
            let msj = 'El usuario ya existe'
              return callback(null,false,req.flash('signupMessage', msj))
          }


          const newUser = {
              firstName: req.body.firstname,
              lastName: req.body.lastname,
              email: req.body.email,
              username: username,
              password: createHash(password)
          }



          UserModel.create(newUser, (err, userWithId) => {
              if (err) {
                  return callback(err)
              }


              return callback(null, userWithId)
          })
      })
  }
))

passport.serializeUser((user, callback) => {
  callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
  UserModel.findById(id, callback)
})

//  LOGIN
app.get('/login', auth.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/login',failureFlash : true}), auth.postLogin);

//  SIGNUP
app.get('/signup', auth.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/signup',failureFlash : true }), auth.postSignup);

//  LOGOUT
app.get('/logout', auth.getLogout);


let ruta = './src/daos/mensajes/MensajesDaoFirestore'

if(process.env.CONTAINER == 'MONGO')
     ruta = './src/daos/mensajes/MensajesDaoMongo'


const {MensajesDao } = require(ruta)

const mensajeDao = new MensajesDao();

const rutasExistentes = function loggerRoute(req, res, next) 
{
  loggerInfo.log('warn',{'ruta':req.path})
  return next();
}

const rutasInexistentes = function loggerRoute(req, res, next) 
{
  loggWarn.log('error',{'ruta':req.path})
  return next();
}

app.use(rutasExistentes)

function checkAuth(req, res, next) {
  if(req.session?.logged) {
      return next();
  }

  res.render('login',{msj: 'Usted no tiene permisos'})
}

app.get('/info',(req,res)=>{
  res.json({'params'      :args,
            'os'          :process.platform,
            'node_version':process.versions.node,
            'rss'         :process.memoryUsage().rss,
            'pid'         :process.pid,
            'folder'      :process.cwd(),
            'cores'       :numCPUs,
            'path'        :process.cwd()+'/server.js'})
});

randomRouter.get('/', (req,res)=>{
  const forked = fork('app/computo.js')
  
  let cant = parseInt(req.query.cant|| 1e6) 

  forked.send({largo: cant})

  let salida = []
   forked.on('message',msj=>{res.json(msj)})
 
});


app.use('/api/randoms',randomRouter)


app.get('/',(req,res)=>{
  res.render('login',{msj: 'Ingresar Usuario'})
})

app.get('/index',auth.checkAuthentication,(req,res)=>{
  let username = req.query.username
  let email = req.query.email
  res.render('index',{username: username,email:email})

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

app.get('/*',rutasInexistentes,(req,res)=>{{
  res.json({'msg':'Ruta Inexistente revisar ./logg/warn.log'})
}})

httpServer.listen(port)
