const {knex} = require('./mariaDB.js')

knex.schema.createTable('cars',table=>{

    table.increments('id')
    table.string('name')
    table.integer('price')

}).then(()=>{console.log('tabla creada')})