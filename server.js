const http = require('http')
const path = require('path')
const express = require('express')
const fetch = require('node-fetch');
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
        io.emit('price', result.price)
    })
})

app.get('/api/price', async (req, res, next) => {
    const result = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT')
    const finalResult = await result.json()
    console.log(finalResult)
    res.status(200).json({
        status: 'success',
        data: {
            symbol: 'BTCRIAL',
            price: finalResult.price * 1 * 29750,
        }
    })
})

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        data: {
            err: `There is no such a route on this server!!!`,
            url: `${req.originalUrl}`
        }
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Listening On PORT ${PORT}`))