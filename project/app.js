//Create express application
const app = require('express')();

// Create http server 

const http = require('http').Server(app);

// Create instance of socket

const io = require('socket.io')(http);

//Store users and their colors 

const users = new Map();

//Function that generates random colors.
function getRandomColor(){
    const colors = [
        '#2196F3', // Blue
        '#4CAF50', // Green
        '#E91E63', // Pink
        '#FF9800', // Orange
        '#9C27B0', // Purple
        '#00BCD4', // Cyan
        '#795548', // Brown
        '#673AB7'  // Deep Purple
    ];
    return colors[Math.floor(Math.random() * colors.length)]
}

// Create route 

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//On connection...
io.on("connection", function(socket){
    console.log('A user connected');

    //listen for a new user 
    //when there is a new user, then run the following function
    socket.on('new user', function(username){

        if(!users.has(socket.id)){
            const userInfo = {
                username: username,
                color: getRandomColor()
            };

        users.set(socket.id, getRandomColor());

        io.emit('system message', {
            message: `${username} has joined the chat`,
        });
        }
    //.set() adds a new element to Map() with key and value.
    console.log(`Username: ${username} , UserID: ${socket.id}`); 
});

    socket.on('chat message', function(data){
        const userColor = users.get(socket.id);  // Get the user's color
        if (userColor) {
            io.emit('chat message', {
                username: data.username,
                message: data.message,
                color: userColor
            });
        }
    })

});

//Tell server to listen to port 3000

http.listen(3000, function(){
    console.log("Connected");
})


