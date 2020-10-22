const socket = io()
const input = document.querySelector('#showPrice')
const h1 = document.getElementsByTagName('h1')

socket.on('price', price => {
    outPutPrice(price)
})



// Fetch
const setPrice = () => {
    console.log('hi')
    fetch('https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT')
        .then(response => response.json())
        .then(data => socket.emit('Change', data))
}

const outPutPrice = (price) => {
    console.log(price)
    h1[0].innerHTML = price
}

// Checking the Price every moment
setInterval(setPrice, 10000)
// Reloading the page each 5 seconds
/*setTimeout(() => {
    window.location.reload(true)
}, 10000)*/


