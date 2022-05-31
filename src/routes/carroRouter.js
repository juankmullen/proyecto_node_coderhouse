const express = require('express')
const {Router} = express
const carroRouter = Router()

require('dotenv').config()

let ruta = '../daos/carros/CarrosDaoFirestore'

if(process.env.CONTAINER == 'MONGO')
     ruta = '../daos/carros/CarrosDaoMongo'


const {CarrosDao } = require(ruta)

const carrosDao = new CarrosDao();


// get id carro
carroRouter.get('/:id', async (req,res)=>{
    let carros =  await carrosDao.getDoc(req.params.id)
    
    res.json({'carros': carros})
})

// get all carros
carroRouter.get('/', async (req,res)=>{
    let carros =  await carrosDao.getAll()
    
    res.json({'carros': carros})
})

//create carro
carroRouter.post('/', async (req,res)=>{
    let carros = await carrosDao.save()
    res.json({carros})
})

//delete carro
carroRouter.delete('/:id', async (req,res)=>{
    let msj = await carrosDao.delete(req.params.id)
    res.json(msj)
})


module.exports = carroRouter;