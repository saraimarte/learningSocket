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

const messageHistory = new Map(); // list of [{room : [{user : messages}, ... ]}]

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    console.log("New User Connected");

    socket.on('new message', function(data){
      
        // A USER SENT A NEW MESSAGE TO A ROOM

        //if the room doesnt exist yet then...
        if(!messageHistory.has(data.r)){
            //add it and create an array to hold the messages from each user in a room
            messageHistory.set(data.r, []);
        }

        //otherwise, the room already exists - people have already chatted in it - it has messages
        const roomMessages = messageHistory.get(data.r);

        //add a row with the user and the new message to roomMessages
        roomMessages.push({[data.u] : data.m});

        messageHistory.set(data.r, roomMessages);

        //console.log('MESSAGE HISTORY');
       // console.log(messageHistory);

        //if the user has not been in a room then...
        if(!rooms.has(data.u)){
            //add the user to that room
            rooms.set(data.u, data.r);     
            socket.join(data.r);            


            const usersArray = Array.from(users.entries()); // Converts Map to an array of key-value pairs


            socket.emit('switch rooms', {
                mh: messageHistory.get(data.r),
                newRoom : data.r,
                mapOfColors : usersArray,


                /*I cant just do mapOfColors : users, because: The issue seems to be in how you're passing mapOfColors (which is users on the server) to the client. Specifically, when emitting switch rooms, you're passing users (a Map object) directly, but socket.emit() serializes data into JSON. Since JSON does not support Map objects, the client receives undefined.*/
              
          
            });

        }else { //if the user is in a room...
            //get the oldroom
            const oldRoom = rooms.get(data.u);

            //if the current room data.r is not the same as the oldRoom that means
            //the user changed rooms, so you have to leave oldRoom and join the new room
            if(data.r !== oldRoom){
                socket.leave(oldRoom);
                socket.join(data.r);    
                
                //console.log(messageHistory.get(data.r));

                const usersArray = Array.from(users.entries()); // Converts Map to an array of key-value pairs


                socket.emit('switch rooms', {
                    mh: messageHistory.get(data.r),
                    newRoom : data.r,
                    mapOfColors : usersArray,

                });

                console.log(Object.fromEntries(users));

            }
        }


        if(!users.get(data.u)){ //if this user does not exist yet 
            //then add them 
            users.set(data.u, getRandomColor());
        }

        io.to(data.r).emit('send message', {
            un : data.u,
            msg : data.m , 
            color : users.get(data.u),
        });
    })

})


http.listen('3000', function(){
    console.log("Connected");
})



