const mongoose = require('mongoose')
const URL = 'mongodb://localhost:27017/ecommerce'
let rta =  mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology :true})
console.log('conectado a mongo')

class Container 
{
 
    async update(schema,data,id)
    {
        return schema.update({_id:id},{$set : data})
    }

    async save(schema,data)
    {
        const saveModel = new schema(data)
        return await saveModel.save()
    }

    async getAll(schema)
    {
        return schema.find({})
    }

    async get(schema,id)
    {
        if(!mongoose.Types.ObjectId.isValid(id))
            return false

        let existe =  await schema.exists({_id:id})
        let doc = schema.findOne({_id:id})
        return doc
    }

    async delete(schema,id)
    {
        return schema.deleteOne({_id:id})
    }

    
}


module.exports = {Container};