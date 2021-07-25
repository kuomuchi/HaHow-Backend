require('dotenv').config()
const express = require("express")
const app = express()
let { port } = process.env
port = (port)? port : 3000

const { apiLimiter } = require("./limiter_ rule") // limite

const { stratCatchData } = require("./server/models/auto_catch_data")
stratCatchData() // auto catch hahow api data


const socketio = require("socket.io")
const http = require("http")

const server = http.createServer(app)
const io = socketio(server, { cors: { origin: "*" } })



app.use("/", express.static('public'))

app.use("/", apiLimiter, [
    require("./util/util").authenticated(), // catch headers, get user data
	require("./server/routes/heroes.js") // heroes api
])

server.listen(port, () => {
    console.log("run on " + port)
})

const { socketCon } = require("./socket")
socketCon(io)

module.exports = server