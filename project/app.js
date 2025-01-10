//Create express application
const app = require('express')();

// Create http server 

const http = require('http').Server(app);

// Create instance of socket

const io = require('socket.io')(http);

//Route 
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

const users = new Map();

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
    ];
    
    return (colors[Math.floor(Math.random() * colors.length)]);
    
}

io.on('connection', function(socket){
    console.log("New User Connected");
    socket.on('new message', function(data){
        console.log(`Username: ${data.u}\nMessage: ${data.m}`);




        //if user doesn't exist {}
        if(!users.has(socket.id)) {
            //assign the user a color 
           users.set(socket.id, getRandomColor());

           io.emit('system message', {
            username : 'system',
            message : `${data.u} has joined the chat`,
            color: '#888888',
           })
        } 

        io.emit('new message', {
            un: data.u,
            msg: data.m, 
            color: users.get(socket.id),
        })
    })
    
})

http.listen(3000, function(){
    console.log("Connected");
})