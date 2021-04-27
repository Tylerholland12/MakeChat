// App.js

const express = require('express');
const app = express();
//Socket.io has to use the http server
const server = require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
let onlineUsers = {};
//Save the channels in this object.
let channels = {"General" : []}
let onlineChannels = {};

io.on("connection", (socket) => {
  // This file will be read on new socket connections
  // Make sure to send the channels to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers, channels, onlineChannels);
})

//Express View Engine for Handlebars
const exphbs  = require('express-handlebars');
app.engine('hbs', exphbs({defaultLayout: 'index', extname: '.hbs'}));
app.set('view engine', 'handlebars');

//Establish your public folder
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.hbs');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})