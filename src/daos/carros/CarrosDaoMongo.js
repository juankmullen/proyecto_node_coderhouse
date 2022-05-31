const moment = require('moment')

let ruta = '../../contenedores/ContainerFirestore'

if(process.env.CONTAINER == 'MONGO')
     ruta = '../../contenedores/ContainerMongo'

const {Container} = require(ruta)  

const {carros} = require('../../../models/Carro')



class CarrosDao extends Container
{
    async setProductCarro(id_carro,productCollection)
    {
        let ref = super.update(carros,productCollection,id_carro)
        return await this.getDoc(id_carro)
    }
    async save()
    {
        let timestamp = moment().format('YYYY-MM-DD HH:mm:s');
		const carro = {'timestamp': timestamp}
        return super.save(carros,carro);
    }

    async getDoc(id)
    {
        return super.get(carros,id)
    }

    async getAll()
    {
        return super.getAll(carros)
    }

    async delete(id)
    {
        return super.delete(carros,id)
    }

    
}


module.exports = {CarrosDao}