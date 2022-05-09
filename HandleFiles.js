class Contenedor {

    constructor(name_file = './chat.txt')
    {
        this.name_file = name_file
        this.chat = []

        
    }

    getDataText()
    {
        const fs = require('fs')

        if (!fs.existsSync(this.name_file))  // traigo data solo si el archivo existe, en caso contrario no leo texto
            return false

        const data = fs.readFileSync(this.name_file, 'utf8')
        
        if(data === '')
            this.chat = []
        else
            this.chat = JSON.parse(data)

    }

    writeFile(array_chat)
    {
        const fs = require('fs')
        fs.writeFileSync(this.name_file,JSON.stringify(array_chat))

    }

    getMaxId()
    {
        let indice = 0

        if(!this.chat)
            return 1

        let nodo    = this.chat.forEach((item,index,arr)=>{
                
            if(item.id > indice)
                   indice = item.id
            })

        return indice++
    }

    save(newChat)
    {
        let {email,created_at,msj}  = newChat[0]
        this.getDataText() // traigo la data almacenada en el archivo en caso de existir

        let id_chat               = this.getMaxId() +1  // debe ser siempre el maximo id ( CORREGIR)
        this.chat.push({email:email,created_at:created_at,msj:msj})  // agrego un item mas en el array de chat

        this.writeFile(this.chat) // guardo en el archio el array actualizado
        return id_chat
    }

    getById(id_search = 0)
    {
        this.getDataText()   

        let indice  = null
        let nodo    = this.chat.forEach((item,index,arr)=>{
                
                    if(item.id == id_search)
                            indice = index
                    else
                        return null
            })

        if(indice)
            return this.chat[indice];
        else 
            null
    }

    deleteById(id_search = 0)
    {
        this.getDataText()   
        let indice = 0
        let nodo    = this.chat.forEach((item,index,arr)=>{
                
                    if(item.id == id_search)
                       indice =index
                    else
                        return null
            })
        this.chat.splice(indice,1);
        this.writeFile(this.chat) // guardo en el archio el array actualizado

    }
    deleteAll()
    {
        this.getDataText()
        this.chat = []
        this.writeFile(this.chat)
    }

    getAll()
    {
        this.getDataText() // traigo la data almacenada en el archivo en caso de existir
        return this.chat
    }

}

module.exports = Contenedor