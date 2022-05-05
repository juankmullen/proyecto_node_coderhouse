const {knex} = require('./mariaDB.js')

knex.from('cars').select('*')
.then((result)=> {console.log(result)})
    .catch((err)=>{console.log(error)})