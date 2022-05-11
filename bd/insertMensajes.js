const { knexSqLite } = require('./options/sqlite3');

class MensajesSqlite3
{

   insertMensaje(mensajes)
   {
        knexSqLite('mensajes').insert(mensajes).finally(()=>{knexSqLite.destroy()})
    }

    selectMensajes()
    {
       return  knexSqLite('mensajes')
       .select('*')
       .then((result)=> { return result})
       .catch((err)=>{console.log(err)})
       .finally(()=>{knexSqLite.destroy()})


    }
}

module.exports = MensajesSqlite3 