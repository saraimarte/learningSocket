//import modules 

const express = require('express');
const http = require('http');
const socketio = require('socket.io');

//Initialize App
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Import functions

const {addUser, getRandomColor, doesUserExist} = require('../utils/users');
const {addUser2, getRandomColor2, doesUserExist2, getUsers2} = require('../utils/users2');

//Route
app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.get('/chat.html', function(req, res){
    res.sendFile(__dirname + "/chat.html");
})

io.on('connection', function(socket){

    const user2 = addUser2(socket.id);

    //console.log(user2);

    socket.on('join room', ({username, room}) =>{

        function getUserColor(id){

            const users2 = getUsers2();
            
            return users2.find(user => user.id === id).color;

        }

        const user = addUser(socket.id, username, room, getUserColor(socket.id));
        //console.log(user);

        socket.join(user.room);
        
        socket.broadcast.to(user.room).emit('new user', {username, room});

  
        socket.on('new message', function(message){
            const user =  getUsers2();
            //console.log(user);
            io.to(user.room).emit('displayMessage', {message});
        })

    })


    socket.on('disconnect', function(){
        console.log('Disconnected');

       // io.to(room).emit('disconnection', socket.id);

    })


})


server.listen(3000, function(){
    console.log('Listening on port 3000');
})