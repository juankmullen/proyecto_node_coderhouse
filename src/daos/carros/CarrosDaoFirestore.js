const {ContainerFirestore} = require('../../contenedores/ContainerFirestore')
const moment = require('moment')

class CarrosDaoFirestore extends ContainerFirestore 
{
    constructor(){
        super('carros');
    }

    
    async delete(id)
    {
        let result = await super.delete(id)
        return result
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
            info :doc.data().timestamp,
            id: doc.id
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


module.exports = {CarrosDaoFirestore}