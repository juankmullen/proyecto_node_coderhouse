require('dotenv').config()
const mongoose = require('mongoose')
const URL = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@${process.env.CLUSTER}/${process.env.DBNAME}?retryWrites=true&w=majority`
let rta =  mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology :true})

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
        let msj = schema.find({})
        return msj
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