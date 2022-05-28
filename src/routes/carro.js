const express = require('express')
const {Router} = express
const carroRouter = Router()

const {CarrosDaoFirestore } = require('../daos/carros/CarrosDaoFirestore')
const carrosDaoFirestore = new CarrosDaoFirestore();


carroRouter.get('/', async (req,res)=>{
    let carros =  await carrosDaoFirestore.getAll()
    
    res.json({'carros': carros})
})

carroRouter.post('/',(req,res)=>{
    let carros = carrosDaoFirestore.save()
    res.json({'carros': carros})
})


module.exports = carroRouter;