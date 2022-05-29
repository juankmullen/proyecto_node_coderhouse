let admin = require("firebase-admin");
let serviceAccount = require("../../db/serviceAccountKey.json");
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const db = admin.firestore()

class ContainerFirestore 
{
    constructor(collection)
        {
            this.collection = db.collection(collection)
        }

    async getDoc(id)
    {
        const search  =  await this.collection.doc(id).get();

        if(search.exists)
            {
                await this.collection.doc(id).get();
                return {error:0,data:search}

            }
        else
            return {error:1,data:[]}
    }
    async delete(id)
    {
        const search  =  await this.collection.doc(id).get();
        
        if(search.exists)
            {
                await this.collection.doc(id).delete();
                return {msj:'DOC Eliminado'}

            }
        else
            return {msj:`No existe DOC : ${id}`}
               
    }

    async save(documento)
    {
        let doc   =   await this.collection.add(documento)
        return {id:doc.id};
    }

    async getAll()
    {
        let datos = {}
        const snapshot = await this.collection.get()
        return snapshot

    }
}


module.exports = {ContainerFirestore};