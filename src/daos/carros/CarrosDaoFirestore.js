const {ContainerFirestore} = require('../../contenedores/ContainerFirestore')
const moment = require('moment')

class CarrosDaoFirestore extends ContainerFirestore 
{
    constructor(){
        super('carros');
    }

    async getAll()
    {
        let result = await super.getAll()


        return result

    }

    async save()
    {
        let timestamp   = moment().format('YYYY-MM-DD HH:mm:s');
		const carro     = {'timestamp': timestamp}
        let result      = super.save(carro); 
        return result;       
    }
}


module.exports = {CarrosDaoFirestore}