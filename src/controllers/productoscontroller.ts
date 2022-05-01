import Producto from "../models/Producto";

const listproductos: Array<Producto> = []

const getMaxId = () : number =>
    {
        let indice = 1

        for (let index = 0; index < listproductos.length; index++) {
            
            
            if(listproductos[index]._id > indice)
                indice = listproductos[0]._id

        console.log(listproductos[index]._id)

             
        }

        console.log(indice)
        console.log(listproductos.length)
        console.log("////")

        return indice++
    }
const  store= (title:string,price:number,thumbnail:string) : Array<Producto> => 
    {

        const producto = new Producto(getMaxId(),title,price,thumbnail);
        listproductos.push(producto)

        return listproductos;

    }

const getProducto = (id_search:number) : any =>
    {
        let nodo   = listproductos.find( element=>{ return element._id == id_search})

        if(nodo)
            return nodo
        else
            return {error: 'Producto no encontrado'}

    }

const  getAll= () : any => 
    {
        if(listproductos.length)
            return listproductos;
        else 
           return  {'error' : 'no hay productos'}
    }


export {store,getProducto,getAll}
