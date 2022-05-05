const knex = require('../knex/knex.js')

const cars =    [
                    {name : 'audi',price:1800},
                    {name : 'bmw',price:8745},
                    {name : 'citroen',price:8874},
                    {name : 'honda',price:1254},
                    {name : 'chevrolet',price:84478}
                ]

const insertProductos = ()=>{
    knex('cars').insert(cars)
    .then((result)=> {console.log(result)})
    .catch((err)=>{console.log(error)})
    .finally(()=>{ knex.destroy()})
}

insertProductos()
/*knex('cars').insert(cars)
.then(()=>{console.log("Registros Ingresados")})
.finally(()=>{knex.destroy()}) */