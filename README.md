# Chat-App-using-socket.IO
A basic chat app with room and user functionality. Created with the intention of learning the basics of socket.io 

This webpage uses javascript, express, and socket.io to create a webpage that allows users to join rooms, message to those rooms, and see other users messages to those rooms.

The main points of learning that this project was focussed on was understanding the basics of socket.io.

Key learning points were:

* There are various ways to send data and choose who data is sent to. These include:
  - socket.emit emits a message or code to a single user or more specifically, to that specific socket.
  - socket.broadcast.emit emits a message to all but the user, or socket, that send said messsage.
  - the to() keyword can be added to specify a specific location for that broadcast to go. In this project it is used to specify the room the message is being sent to
  - the .on keyword is used to cause various parts of code to execute when an event happens. This can be used with both socket and io depending on which one you want to take action on whichever event. io.on('connection', socket => { ... }); This is an example of how this is used. In this case, on connection of a new user, all the functions contined within the curly brackets take effect. socket.on('joinRoom', ({ username, room }) => { ... } This is another example but instead it initiates from a socket or individual user, and then the code within the curly brackets executes. You can have other socket and io commands happen within these on events. In fact, this is how most of this webpage runs and has responsiveness.
  - the export and import of functions was another key learning in this project. Several js files were created to have functions related to users and messages. These functions were then exported using the module.exports keyword and were then imported using the require keyword like this: const formatMessage = require('./utils/messages');
  - On the front end, all socket.io work was done using the socket command as the front end is an individual socket.

The next step in applying what I have learned here is using this to add multiplyer functionality to the note racer game I am building
