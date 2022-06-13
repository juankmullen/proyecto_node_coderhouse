const express = require('express')
const {Router} = express
const mensajeRouter = Router()

require('dotenv').config()

let ruta = '../daos/mensajes/MensajesDaoFirestore'

//if(process.env.CONTAINER == 'MONGO')
//     ruta = '../daos/carros/CarrosDaoMongo'


const {MensajesDao } = require(ruta)

const mensajeDao = new MensajesDao();

//create carro
mensajeRouter.post('/', async (req,res)=>{
    let mensajes = await mensajeDao.save(
        req.body.id_author,
        req.body.nombre,
        req.body.apellido,
        req.body.edad,
        req.body.alias,
        req.body.avatar,
        req.body.text,
        )
    res.json({mensajes})
})

mensajeRouter.get('/', async (req,res)=>{
    let mensajes = await mensajeDao.getAll()
    res.json({mensajes})
})


module.exports = mensajeRouter;