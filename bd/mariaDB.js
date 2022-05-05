const knex = require('knex')({
    development:{client: 'mysql',
    connection : {
        host: '127.0.0.1',
        user: 'root',
        password:'',
        database : 'coderhouse'
    },
    pool : {min : 0, max:7}}
})



module.exports = { knex}