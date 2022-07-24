const express = require('express')
const {Router} = express
const randomRouter = Router()

require('dotenv').config()




randomRouter.get('/',(req,res)=>{

            let opciones = []

            options = req.options || 100
            max = 2000
            min = 1000

            for (let index = 0; index < options; index++) 
            {
            let num =  Math.floor(Math.random()*(max-min+1)+min)

            if(index == 0)
                opciones.push({digito:num,cantidad:1})

                result = opciones.filter(digito => digito.digito== num)
                
                if(result.length)
                    {
                        cantidad = result[0].cantidad
                        opciones.filter(digito => digito.digito== num).forEach(digito => digito.cantidad = cantidad+1)
                    }
                else{
                    opciones.push({digito:num,cantidad:1})
                }

            }

            res.json({list:opciones})


})








module.exports = randomRouter;