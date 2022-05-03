const Producto = require('../models/Producto')
let listProductos = []
const moment = require('moment')

class ProductoController
{


  update(idSearch,title,price,foto,descripcion,codigo,stock)
  {
    let index   =  listProductos.findIndex( element=>{ return element.id == idSearch})

    if(index == -1)
      return {'error': 'ID no encontrado'}
    else
      {
        listProductos[index].title        = title
        listProductos[index].price        = price
        listProductos[index].foto         = foto
        listProductos[index].descripcion  = descripcion
        listProductos[index].codigo       = codigo
        listProductos[index].stock        = stock

        return {'producto': listProductos[index]}
      }

  }

  deleteProducto(idSearch)
  {
    let encontrado   =  listProductos.findIndex( element=>{ return element.id == idSearch})
    if(encontrado == -1)
      return {'error': 'ID no encontrado'}
    else
      {
        listProductos.splice(encontrado,1);
        return listProductos
      }



  }

  getProducto(idSearch)
  {
    const encontrado =   listProductos.filter(element=> element.id == idSearch)

    if(encontrado.length)
      return encontrado
    else
      return {'error': 'ID no encontrado'}
  }

  store(title,price,foto,descripcion,codigo,stock)
	{
		let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
		const product = new Producto(this.getId()+1,title,price,foto,timestamp,descripcion,codigo,stock);
		listProductos.push(product)
		return listProductos;
	}

	getProductos()
	{
		return {'productos':listProductos};
	}

	 getId()
	{
    if(!listProductos.length)return 0;

    const ids = listProductos.map(object => {return object.id;});
    let max = Math.max(...ids);

    return max

	}


}

module.exports = ProductoController
