const path = require('path');
const http = require('http');
const express = require("express");
const socketio = require('socket.io')
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = 'Chat City Bot'

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run with client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        //Welcome current user
        //Learning note: socket.emit emits to that single user
        socket.emit('message', formatMessage(botName, 'Welcome to chat City babyyy'));

        // Broadcast upon connectiion of a user
        //Learning note: socket.broadcast.emit emits to all users except for the one that cause the broadcast
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));


        //Send users room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });



    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)

        io.to(user.room).emit('message', formatMessage(user.username, msg))
    });

    // Broadcast when user leaves chat
    //socket.on is used to cause an event when the socket does something such as connecting or disconnecting
    // bascially it is like saying in the event of a socket disconnecting: do this  
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );

            //Send room and users 
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
        //learning note: io.emit emits to all users
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))