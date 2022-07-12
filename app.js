const { application } = require('express')
const express = require('express')
const {fork} = require('child_process');
const forked = fork('app/computo.js')
const numCPUs = require('os').cpus().length

const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({port:8080}).argv

port = args.port

const app               = express()
const randomRouter      = require('./src/routes/randomsRouter')

app.use(express.json())
app.use(express.urlencoded({extended: true}))



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
  
  // Proceso fork
  randomRouter.get('/', (req,res)=>{
    const forked = fork('app/computo.js')
    
    let cant = parseInt(req.query.cant|| 1e6) 
  
    forked.send({largo: cant})
  
    let salida = []
     forked.on('message',msj=>{res.json(msj)})
  
   
   
  });





app.use('/api/randoms',randomRouter)




app.listen(port,()=>{
    console.log(`puerto escuhando en el puerto ${port}`)
})
