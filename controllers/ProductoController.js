const Producto = require('../models/Producto')

const listProductos = []

class ProductoController
{
    store()
	{
		const product = new Producto( this.getId(),"vehiculo",1800,"www.google.cl");
		listProductos.push(product)
		return listProductos;
	}

	getProductos()
	{
		return {'productos':listProductos};
	}

	getId()
	{ 
		let indice = 0

		if(listProductos.length == 0)
			return 1

		return  listProductos.reduce((anterior,actual)=> {return anterior.id > actual.id ? anterior : actual},1).id++

	}

	
}

module.exports = ProductoController