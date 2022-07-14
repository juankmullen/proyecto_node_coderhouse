const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({port:8080}).argv
const { exec} = require('child_process');
const { info } = require('console');

let port        = args.port
let mode        = args.mode
let name        = args.name || "Server1"
let ejecucion   = ''



if(mode == 'fork')
    ejecucion = `pm2 start server.js --name="${name}" --watch -- ${port}`

if(mode == 'cluster')
    ejecucion = `pm2 start server.js --name="Servertest" --watch -i max -- ${port} `

if(mode == 'forever')
    ejecucion = `forever start server.js --port  ${port} `



exec( ejecucion,(error,stdout,stderr)=>{
        if(error)
        {
            console.log(`error : ${error.message}`)
            return
        }
    
        if(stderr)
        {
            console.log(`error : ${stderr}`)
        }
    
        console.log(`stdout : \n ${stdout}`)
    })
