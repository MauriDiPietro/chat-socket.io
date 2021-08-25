const express = require('express');
const app = express();
const path = require('path');

//settings
app.set('port', process.env.PORT || 3000);

//static files
console.log(__dirname)
app.use(express.static(path.join(__dirname, 'public')))

//start server
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server); //necesita un servidor ya inicializado

io.on('connection', (socket)=>{
    console.log('new connection', socket.id);

    socket.on('chat:message', (data)=>{    //evento que viene del chat.js
        //socket.on ---> escucha datos
        console.log(data)
        //emit --> para que se envie a todos
        io.sockets.emit('chat:message', data)   //recibe los datos y envia a todos los sockets
    });

    socket.on('chat:typing', (data)=>{
        // console.log(data)
        socket.broadcast.emit('chat:typing', data); //envia a todos menos al que envio
    })
});
