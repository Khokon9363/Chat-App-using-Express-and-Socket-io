// require express
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

// require socket.io
const { Server } = require("socket.io")
const io = new Server(server)

// define a route and send a file for it
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// check new connection on socket.oi
io.on('connection', (socket) => {
  console.log('A new user connected')
  
  // check his disconnection
  socket.on('disconnect', () => {
    console.log('The user disconnected')
  })

  // check if webpage receives any event
  socket.on('chat-channel', (message) => {
    console.log(message)
    socket.broadcast.emit('chat-channel', message) // to send all expect sender
    // io.emit('chat-channel', message) // to send all including sender
  })
})

// console someting if server is running on a port
server.listen(3000, () => {
  console.log('listening on *: process.ENV.port || 3000')
})