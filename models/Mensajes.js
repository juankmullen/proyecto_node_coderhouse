const mongoose = require('mongoose')

const mensajesCollection = 'mensajes';


const mensajesSchema = new mongoose.Schema({
    author : {
        id          : {type : String},
        nombre      : {type : String},
        apellido    : {type : String},
        edad        : {type : Number},
        alias       : {type : String},
        email       : {type : String},
        time       :  {type : String},
    },
    text        : {type : String},
    time       :  {type : String},

})


const mensajes = mongoose.model(mensajesCollection,mensajesSchema)
module.exports = {mensajes};

