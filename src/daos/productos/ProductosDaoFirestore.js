const {ContainerFirestore} = require('../../contenedores/ContainerFirestore')
const moment = require('moment')

class ProductosDaoFirestore extends ContainerFirestore 
{
    constructor(){
        super('productos');
    }
 
    async getDoc(id) 
    {
        let result = await super.getDoc(id)

        let error = result.error

        if(error == 0)
            return result.data.data()
        else
            return 0
    }

    async getAll()
    {
        let result = await super.getAll()
        
        return result.docs.map((doc) => ({
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


module.exports = {ProductosDaoFirestore}