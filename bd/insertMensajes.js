const { knexSqLite } = require('./options/sqlite3');

class MensajesSqlite3
{

   async insertMensaje(mensajes)
   {
        knexSqLite('mensajes')
        .insert(mensajes)
        .then((result)=>{console.log('OK')})
    }

   async  selectMensajes()
    {
       return   knexSqLite('mensajes')
       .select('*')
       .then((result)=> { return result})
       .catch((err)=>{console.log(err)})


    }
}

module.exports = MensajesSqlite3 