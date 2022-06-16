const {Container} = require('../../contenedores/ContainerFirestore')
const moment = require('moment')
const  { faker } = require('@faker-js/faker');

class ProductosDao extends Container
{
    constructor(){super('productos');}

    async test()
    {
        let productos = [];

        for (let index = 0; index < 5; index++) {
            let nodo = {
                name : faker.commerce.productName(),
                price : faker.commerce.price(100,10000),
                foto : faker.image.imageUrl(),
                descripcion : faker.lorem.text(),
                codigo : faker.random.alphaNumeric(4),
                stock :faker.random.numeric(3),
                id : index
            }

            productos.push(nodo);
            
        }

        return productos;
        
        
    }

    async getDoc(id)
    {
        let nodo =  await super.getDoc(id)
        let data = []

        if(nodo !=0)
        {
            data = nodo.data
            return {
                id          : nodo.id,
                title       : data.title,
                price       : data.price,
                foto        : data.foto,
                descripcion : data.descripcion,
                codigo      : data.codigo,
                stock       : data.stock,
            }
        }else
        return 0
        
    }


    async getAll()
    {
        let result = await super.getAll()
        
        return result.docs.map((doc) => ({
            id          : doc.id,
            title       : doc.data().title,
            price       : doc.data().price,
            foto        : doc.data().foto,
            descripcion : doc.data().descripcion,
            codigo      : doc.data().codigo,
            stock       : doc.data().stock,
        }));

    }

    async save(title,price,foto,descripcion,codigo,stock)
    {
        let product = { 
                        title       : title,
                        price       : price,
                        foto        : foto,
                        descripcion : descripcion,
                        codigo      : codigo,
                        stock       : stock
                    }

        let result      = await super.save(product); 
        return result;       
    }

}


module.exports = {ProductosDao}