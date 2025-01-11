const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const getRandomColor = function(){
    
    const colors = [
        '#FADADD', // Baby Pink
        '#B0E0E6', // Powder Blue
        '#E6E6FA', // Lavender
        '#98FF98', // Mint Green
        '#FFDAB9', // Peach
        '#87CEEB', // Sky Blue
        '#FFFACD', // Lemon Chiffon
        '#F88379', // Coral Pink
        '#C8A2C8', // Lilac
        '#CCCCFF', // Periwinkle
        '#9FE2BF', // Seafoam Green
        '#FFFFE0', // Soft Yellow
        '#FFC0CB', // Blush
        '#D6CADD', // Pale Lavender
        '#AEC6CF', // Robin's Egg Blue
        '#FFFDD0', // Cream
        '#FFB7C5', // Bubblegum Pink
        '#FFE5B4', // Light Peach
        '#A7C7E7', // Soft Teal
        '#FFD1B3'  // Pastel Orange
    ]
    return (colors[Math.floor(Math.random() * colors.length)]); 
}
const users = new Map(); // {socket.id(user) : color}
 
const rooms = new Map(); // {socket.id(user) : room}


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    console.log("New User Connected");

    socket.on('new message', function(data){


        //if the user has not been in a room then...
        if(!rooms.has(socket.id)){
            //add the user to that room
            rooms.set(socket.id, data.r);     
            socket.join(data.r);            

        }else {
            //get the oldroom
            let oldRoom = rooms.get(socket.id);

            //if the current room data.r is not the same as the oldRoom that means
            //the user changed rooms, so you have to leave oldRoom and join the new room
            if(data.r !== oldRoom){
                socket.leave(oldRoom);
                socket.join(data.r);            
                socket.emit('switch rooms');

            }
        }

    
        console.log(`ROOM: ${data.r}`);

        if(!users.get(socket.id)){ //if this user does not exist yet 
            //then add them 
            users.set(socket.id, getRandomColor());
        }

        io.to(data.r).emit('send message', {
            un : data.u,
            msg : data.m , 
            color : users.get(socket.id),
        });
    })

})


http.listen('3000', function(){
    console.log("Connected");
})



