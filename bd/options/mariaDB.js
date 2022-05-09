const knexMysql  = require('knex')({
    client: 'mysql',
    connection : {
            host: '127.0.0.1',
            user: 'root',
            password:'',
            database : 'coderhouse'
        },
        pool : {min : 0, max:7},
        useNullAsDefault: true

})



module.exports = { knexMysql }