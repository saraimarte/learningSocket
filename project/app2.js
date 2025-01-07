const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Store users and their colors
const users = new Map();

// Function to generate a random color
function getRandomColor() {
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
    return colors[Math.floor(Math.random() * colors.length)];
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('A user connected');

    socket.on('new user', function(username) {
        // Assign a random color to the user
        const userColor = getRandomColor();
        const userData = {
            username: username,
            color: userColor
        };
        users.set(socket.id, userData);
        
        // Announce new user
        io.emit('chat message', {
            username: 'System',
            message: `${userData.username} has joined the chat`,
            color: '#888888'
        });
    });

    socket.on('chat message', function(data){
        const user = users.get(socket.id);
        if (user) {
            io.emit('chat message', {
                username: data.username,
                message: data.message,
                color: user.color
            });
        }
    });

    socket.on('disconnect', function() {
        const user = users.get(socket.id);
        if (user) {
            io.emit('chat message', {
                username: 'System',
                message: `${user.username} has left the chat`,
                color: '#888888'
            });
            users.delete(socket.id);
        }
    });
});

http.listen(3000, function(){
    console.log("Connected at 3000");
});