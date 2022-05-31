const mongoose = require('mongoose')

const productosCollection = 'productos';


const ProductosSchema = new mongoose.Schema({
	title 		: {type : String},
	price 		: {type : Number},
	foto 		: {type : String},
	timestamp 	: {type : Date},
	descripcion : {type : String},
	codigo 		: {type : String},
	stock 		: {type : Number}
})


const productos = mongoose.model(productosCollection,ProductosSchema)
module.exports = {productos};
