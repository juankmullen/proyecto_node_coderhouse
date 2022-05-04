const Carro = require('../models/Carro')
const moment = require('moment')
const fs = require('fs')
let listCarros = []
let listProductos = []



class CarroController
{
	deleteCarroProductos(id_carro,id_prod)
	{
		this.getDataTextProductos()

		let indexCarro   	=  listCarros.findIndex( element=>{ return element.id == id_carro})
		if(indexCarro == -1)
			return {'error': 'ID Carro no encontrado'}

		let indexProducto   	=  listCarros[indexCarro].productos.findIndex( element=>{ return element.id == id_prod})
		if(indexProducto == -1)
			return {'error': 'ID Producto no encontrado'}

		listCarros[indexCarro].productos.splice(indexProducto,1)

		return {'carro': listCarros[indexCarro]}

	}

	setCarroProductos(id_carro,id_prod)
	{
			// get data productos
		 	this.getDataTextProductos()

		 	let indexCarro   	=  listCarros.findIndex( element=>{ return element.id == id_carro})
		 	if(indexCarro == -1)
		 		return {'error': 'ID Carro no encontrado'}

		 	let indexProducto   	=  listProductos.findIndex( element=>{ return element.id == id_prod})
		 	if(indexProducto == -1)
		 		return {'error': 'ID Producto no encontrado'}

			let producto = listProductos[indexProducto]
			listCarros[indexCarro].productos.push(producto)

			return {'carro': listCarros[indexCarro]}
	}

	getCarroProductos(idSearch)
	{
		let productos = [];
		let index   	=  listCarros.findIndex( element=>{ return element.id == idSearch})
		if(index == -1)
			return {'error': 'ID no encontrado'}
		else
		{
			productos = listCarros[index].productos

			return {'productos' : productos}
		}

	}

	deleteCarro(idSearch)
	  {
	    let index   =  listCarros.findIndex( element=>{ return element.id == idSearch})
	    if(index == -1)
	      return {'error': 'ID no encontrado'}
	    else
	      {
	        listCarros.splice(index,1);
	        //persisitir carros
	        this.writeFile(listCarros,'carros.txt')
	        return listCarros
	      }
	  }

	writeFile(array_productos,name_file)
    {
        fs.writeFileSync(name_file,JSON.stringify(array_productos))

    }

	getId()
	{
	    if(!listCarros.length)return 0;

	    const ids = listCarros.map(object => {return object.id;});
	    let max = Math.max(...ids);

	    return max
	}

	store()
	{
		let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
		const carro = new Carro(this.getId()+1,timestamp);
		listCarros.push(carro)

    	//persistir productos
    	this.writeFile(listCarros,'carros.txt')
		return {'id': carro.id};
	}

	getDataTextProductos()
    {
        if (!fs.existsSync('productos.txt'))  // traigo data solo si el archivo existe, en caso contrario no leo texto
            return false

        const data = fs.readFileSync('productos.txt', 'utf8')

        if(data === '')
            listProductos = []
        else
            listProductos = JSON.parse(data)

    }
}

module.exports = CarroController
