const socket = io()
const input = document.querySelector('#showPrice')
const clockElement = document.querySelector("#clock")
const inputToShow = document.querySelector('#priceInput')
const inputToRial = document.querySelector('#rial')
const inputToBTC = document.querySelector('#btc')

let priceToCalculate = 0

inputToRial.addEventListener('change', (e) => {
    e.preventDefault()
    inputToBTC.value = inputToRial.value / (priceToCalculate * 1 * 297500)
})

inputToBTC.addEventListener('change', (e) => {
    e.preventDefault()
    inputToRial.value = inputToBTC.value * priceToCalculate * 1 * 297500
})

socket.on('price', price => {
    outPutPrice(price)
})

const updateClock = (clock) => {
    clock.innerHTML = new Date().toLocaleTimeString()
}

setInterval(function () {
    updateClock(clockElement);
}, 1000)

// Fetch
const setPrice = () => {
    fetch('https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT')
        .then(response => response.json())
        .then(data => {
            socket.emit('Change', data)
            priceToCalculate = data.price
        })
}

const outPutPrice = (price) => {
    console.log(price)
    inputToShow.value = `${price * 1 * 297500} ریال`
}

// Checking the Price every 10 Seconds
setInterval(setPrice, 10000)
// Reloading the page each 5 seconds
/*setTimeout(() => {
    window.location.reload(true)
}, 10000)*/


