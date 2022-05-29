const express = require('express')
const {Router} = express
const carroRouter = Router()

const {CarrosDaoFirestore } = require('../daos/carros/CarrosDaoFirestore')
const carrosDaoFirestore = new CarrosDaoFirestore();


// get id carro
carroRouter.get('/:id', async (req,res)=>{
    let carros =  await carrosDaoFirestore.getDoc(req.params.id)
    
    res.json({'carros': carros})
})

// get all carros
carroRouter.get('/', async (req,res)=>{
    let carros =  await carrosDaoFirestore.getAll()
    
    res.json({'carros': carros})
})

//create carro
carroRouter.post('/', async (req,res)=>{
    let carros = await carrosDaoFirestore.save()
    res.json({carros})
})

//delete carro
carroRouter.delete('/:id', async (req,res)=>{
    let msj = await carrosDaoFirestore.delete(req.params.id)
    res.json(msj)
})


module.exports = carroRouter;