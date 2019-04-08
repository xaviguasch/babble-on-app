const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

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

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }
        io.emit('serverToClient', message)
        callback()

    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })


    socket.on('sendLocation', (coords) => {

        io.emit('messageLoc', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })


})




server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})