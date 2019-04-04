const socket = io()


// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!', count);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked');
//     socket.emit('increment')
// })


socket.on('serverToClient', (message) => {
    console.log(`from the server: ${message}`);
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = document.querySelector('#input').value
    socket.emit('sendMessage', message)
})