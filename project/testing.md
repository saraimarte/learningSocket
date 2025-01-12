
        userMessages.set(socket.id, data.m);
        userMArray.push(userMessages);

        //roomMessages.set(data.r, userMArray);
        messageHistory.set(data.r, userMArray);

        console.log(' ');

        console.log('USER MESSAGES MAP');
        console.log(userMessages);

        console.log(' ');

        console.log('ROOM MESSAGES MAP');
        console.log(roomMessages);

        console.log(' ');

        console.log('MESSAGE HISTORY');
        console.log(messageHistory);

        console.log(' ');
