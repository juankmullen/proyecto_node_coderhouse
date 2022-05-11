const knexSqLite  = require('knex')({
    client: 'sqlite3',
    connection : {filename : './bd/ecommerce.sqlite3',},
    pool : {min : 0, max:7},
    useNullAsDefault: true
})



module.exports = { knexSqLite }