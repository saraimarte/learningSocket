<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<script src = "/socket.io/socket.io.js"></script>

<body>
  <ul id = "messages"></ul>
  <form action = "">

    <input id = "m" autocomplete="off"/> 
    <button>Send</button>
  </form>
</body>

<script>

    let username = prompt("Please enter your username:");
    while (!username) {
        username = prompt("Username is required. Please enter your username:");
    }

    // Initialize socket connection
    const socket = io();

    socket.emit('new user', username);

    // Get form element
    const form = document.querySelector('form');
    const messagesContainer = document.getElementById('messages');

    // Add submit event listener
    form.addEventListener('submit', function(e) {
        // Prevent the form from submitting normally
        e.preventDefault();
        
        // Get the input element
        const input = document.getElementById('m');
        
        // Emit the username and message through socket
        socket.emit('chat message', {
            username: username,
            message: input.value
        });
    
        // Clear the input
        input.value = '';
        
        // Return false to prevent any default behavior
        return false;
    });

      
    socket.on('chat message', function(msg){
        const newEl = document.createElement("li");
        newEl.innerHTML = msg;
        messagesContainer.appendChild(newEl);
    })


</script>

</html>