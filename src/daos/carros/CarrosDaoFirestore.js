const {Container} = require('../../contenedores/ContainerFirestore')
const moment = require('moment')

class CarrosDao extends Container
{
    constructor(){
        super('carros');
    }

    async getDoc(id)
    {
        let nodo =  await super.getDoc(id)
        let data = []

        if(nodo !=0)
        {
            data = nodo.data
            return {
                id              : nodo.id,
                timestamp       : data.timestamp,
                productos       : data.productos,
            }
        }else
        return 0
        
    }

    async setProductCarro(id_carro,productCollection)
    {
        return await super.setProductCarro(id_carro,productCollection)
    }

    async delete(id)
    {
        let result = await super.delete(id)
        return result
    }

    async getAll()
    {
        let result = await super.getAll()

        return result.docs.map((doc) => ({
            id: doc.id,
            timestamp :doc.data().timestamp,
            productos :doc.data().productos
        }));

    }

    async save()
    {
        let timestamp   = moment().format('YYYY-MM-DD HH:mm:s');
		const carro     = {'timestamp': timestamp}
        let result      = await super.save(carro); 
        return result;       
    }
}


module.exports = {CarrosDao}