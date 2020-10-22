const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')



const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Setting static folder
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...')


    // Listening for change (PRICE)
    socket.on('Change', (result) => {
        console.log(result)
        io.emit('price', result.price)
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Listening On PORT ${PORT}`))