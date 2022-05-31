const mongoose = require('mongoose')

const carrosCollection = 'carros';


const CarrosSchema = new mongoose.Schema({
	timestamp : {type : Date},
	productos : {
		title 		: {type : String},
		price 		: {type : Number},
		foto 		: {type : String},
		timestamp 	: {type : Date},
		descripcion : {type : String},
		codigo 		: {type : String},
		stock 		: {type : Number}
				}
	},

)


const carros = mongoose.model(carrosCollection,CarrosSchema)
module.exports = {carros};
