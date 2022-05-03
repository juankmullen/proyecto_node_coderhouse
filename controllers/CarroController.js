const Carro = require('../models/Carro')
const moment = require('moment')
const fs = require('fs')
let listCarros = []
let listProductos = []



class CarroController
{

	deleteCarro(idSearch)
	  {
	    let encontrado   =  listCarros.findIndex( element=>{ return element.id == idSearch})
	    if(encontrado == -1)
	      return {'error': 'ID no encontrado'}
	    else
	      {
	        listCarros.splice(encontrado,1);
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
