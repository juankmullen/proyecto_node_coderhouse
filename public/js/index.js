const socket = io()

function submitChat(event) 
{
    
    event.preventDefault();

    let email       = document.getElementById("email");
    let msj         = document.getElementById("mensaje");
    let hora        = moment().format("DD/MM/YYYY HH:mm:ss");
    let nodo = [{'email':email.value,'msj':msj.value,'created_at':hora}]

    socket.emit('chat',nodo)


}
function submitForm(event)
    {
        event.preventDefault();
        var titulo      = document.getElementById("title");
        var precio      = document.getElementById("price");
        var thumbnail   = document.getElementById("thumbnail");

        let nodo = {'title': titulo.value,'price': precio.value,'thumbnail': thumbnail.value}
        
        socket.emit('notificacion',nodo)
    }

    socket.on('mi mensaje', (data)=>{

        $('#table-body').html("");

        
        data.forEach((element,index) => 
            {
                const item= `<tr> <td>${element.title}</td> <td>${element.price}</td> 
                    <td style="max-width:100px">
                        <img style="max-width:100px; !important" src="${element.thumbnail}">
                    </td> </tr>`;

                if(index ==0)
                     $('#table-body').html(item);
                else
                $('#table-body tr:last').after(item);

            });
    })

    socket.on('chat_a_cliente', (data)=>{

        
        $('#lista_chat').html("");
        
       
        data.forEach((element,index) => 
            {
                let item= `<li><span style="color:blue;font-weight:700">${element.email}</span> <span>[${element.created_at}]</span> 
                            <span style="color:green;font-style:italic">${element.msj}</span></li>`;

                if(index ==0)
                     $('#lista_chat').html(item);
                else
                    $('#lista_chat li:last').after(item);

            });
    })

/*
socket.on('mi mensaje', (data)=>{
    console.log(data)
})



    btn.addEventListener('click', params=>{

        let value = inputMensaje.value
        socket.emit('mensaje',value)

    })

socket.on('mi mensaje',data=>{

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(data));
    parrafo.appendChild(li);
    
}) */
