const mongoose = require('mongoose');

const URL = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`
let rta =  mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology :true})
const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
})

module.exports = mongoose.model(usuariosCollection, UsuarioSchema)