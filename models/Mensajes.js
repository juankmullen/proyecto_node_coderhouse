const mongoose = require('mongoose')

const mensajesCollection = 'mensajes';


const mensajesSchema = new mongoose.Schema({
    author : {
        id          : {type : Number},
        nombre      : {type : String},
        apellido    : {type : String},
        edad        : {type : Number},
        alias       : {type : String},
        email       : {type : String},
        time       :  {type : Date},
    },
    text        : {type : String},
})


const mensajes = mongoose.model(mensajesCollection,mensajesSchema)
module.exports = {mensajes};

