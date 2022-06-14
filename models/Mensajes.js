const mongoose = require('mongoose')

const mensajesCollection = 'mensajes';


const mensajesSchema = new mongoose.Schema({
    author : {
        id          : {type : Number},
        nombre      : {type : String},
        apellido    : {type : String},
        edad        : {type : Number},
        alias       : {type : String},
        avatar      : {type : String},
    },
    text        : {type : String},
})


const mensajes = mongoose.model(mensajesCollection,mensajesSchema)
module.exports = {mensajes};
