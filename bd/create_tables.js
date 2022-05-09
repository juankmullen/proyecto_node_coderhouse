const { knexMysql } = require('./options/mariaDB');
const { knexSqLite } = require('./options/sqlite3');

const createTableProductos = async knex => {
    await knex.schema.createTable('productos', table => {
        table.increments('id')
        table.string('name')
        table.integer('price')
        table.string('thumbnail')
      }).finally(()=>{
    knex.destroy()
});
   }
const createTableMensajes = async knex => {
    await knex.schema.createTable('mensajes', table => {
        table.increments('id')
        table.string('name')
        table.integer('price')
        table.string('thumbnail')
      }).finally(()=>{
    knex.destroy()
});
   }

createTableProductos(knexMysql);
createTableMensajes(knexSqLite);