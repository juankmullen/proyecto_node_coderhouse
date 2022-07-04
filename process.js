const {fork} = require('child_process');
const forked = fork('computo.js')


forked.send({largo: 20})

forked.on('message',msj=>{
    console.log(msj)
})



