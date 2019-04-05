const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

// setup static directory to serve
app.use(express.static(publicDirectoryPath))



io.on('connection', (socket) => {
    console.log('New web socket connection');

    socket.emit('message', 'Welcome, you new user!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (message) => {
        console.log('we got a message from the client');
        io.emit('serverToClient', message)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})




server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})