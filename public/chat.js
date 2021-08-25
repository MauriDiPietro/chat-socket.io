const socket = io() //entre () va el dominio
//socket mantiene la conexion al servidor


/*DOM elements*/
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function (){
    //emit ---> emite los datos
    socket.emit('chat:message', {  //evento emit entre ' ' nombre creado
        username: username.value,
        message: message.value,
    })
    // console.log({
    //     username: username.value,
    //     message: message.value,
    // })
});

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', username.value);
})

socket.on('chat:message', (data)=>{
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
   
    </p>`
})

socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p><en>${data} is writing a message...</en></p>`
})