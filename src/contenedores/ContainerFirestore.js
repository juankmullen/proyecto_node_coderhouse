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

    async save(documento)
    {
        let doc   =  this.collection.doc()
        let item  = await doc.create(documento)

        return item;
    }

    async getAll()
    {
        let datos = {}
        const snapshot = await this.collection.get()
        return snapshot.docs.map((doc) => ({
                                                info :doc.data().timestamp,
                                                id: doc.id
                                            }));

    }
}


module.exports = {ContainerFirestore};