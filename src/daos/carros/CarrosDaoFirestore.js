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

        return result.docs.map((doc) => ({
            info :doc.data().timestamp,
            id: doc.id
        }));


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