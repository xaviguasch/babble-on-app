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

let count = 0


io.on('connection', (socket) => {


    console.log('New web socket connection');


    socket.emit('countUpdated', count)
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})