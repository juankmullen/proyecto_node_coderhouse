class computo
{
    computoRandom()
        {

            let opciones = []

            for (let index = 0; index < options.largo; index++) 
            {
            let num =  Math.floor(Math.random()*(max-min+1)+min)

            if(index == 0)
                opciones.push({digito:num,cantidad:1})

                result = opciones.filter(digito => digito.digito== num)
                
                if(result.length)
                    {
                        cantidad = result[0].cantidad
                        opciones.filter(digito => digito.digito== num).forEach(digito => digito.cantidad = cantidad+1)
                    }
                else{
                    opciones.push({digito:num,cantidad:1})
                }

            }


        }
}


module.exports = {computo}
