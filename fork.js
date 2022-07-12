const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.default({port:8080}).argv
const { exec} = require('child_process');
const { info } = require('console');

let port        = args.port
let mode        = args.mode
let ejecucion   = ''

if(mode == 'fork')
    ejecucion = 'pm2 start server.js --name="Server X" --watch -- 8083'

if(mode == 'cluster')
    ejecucion = `pm2 start server.js --name="Servertest" --watch -i 2 -- ${port} `


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
