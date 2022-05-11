const { knexMysql } = require('./options/mariaDB');

class ProductosMariaDB
{

   async insertProducto(producto)
   {
        knexMysql('productos')
        .insert(producto)
        .then((result)=>{console.log('OK')})
    }

   async  selectProductos()
    {
       return   knexMysql('productos')
       .select('*')
       .then((result)=> { return result})
       .catch((err)=>{console.log(err)})


    }
}

module.exports = ProductosMariaDB 