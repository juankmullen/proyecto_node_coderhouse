const socket = io()

function submitChat(event) 
{
    
    event.preventDefault();

    let id_author   = document.getElementById("id_author");
    let nombre      = document.getElementById("nombre");
    let apellido    = document.getElementById("apellido");
    let email       = document.getElementById("email");
    let msj         = document.getElementById("mensaje");
    let alias       = document.getElementById("alias");
    let hora        = moment().format("DD/MM/YYYY HH:mm:ss");
    let nodo        = {'email':email.value,'msj':msj.value,'hora':hora,'id_author':id_author.value,'nombre':nombre.value,'apellido':apellido.value,'alias':alias.value}

    socket.emit('chat',nodo)


}


    socket.on('mi mensaje', (mensajes)=>{

        $('#table-body').html("");
        console.log(mensajes)
        let data = mensajes.normalizado
        let porc = mensajes.porc
        $('#porc').html(porc);

        let entities = data.entities;
        let autor = data.entities.autor;
        let chat = data.entities.chat;
        let result = data.result;

        
        result.forEach((element,index) => 
            {
                const item= `<tr> <td>${chat[result[index]].time}</td> <td>${autor[chat[result[index]].author].email}</td> <td>${chat[result[index]].text}</td>  </tr>`;

                if(index ==0)
                     $('#table-body').html(item);
                else
                $('#table-body tr:last').after(item);

            });
    })

   
