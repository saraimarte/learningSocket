const mh = [];

function addMessage(id, username, room, message){


    const color = {};
    const message = {id, username, room, message, color};

    mh.push(message);
    
    return message;
}



module.exports = {
    addMessage
}