const express = require("express")
const app = express()

const { apiLimiter } = require("./limiter_ rule") // limite

const { stratCatchData } = require("./server/models/auto_catch_data")
stratCatchData() // auto catch hahow api data

app.use("/", express.static('public'))

app.use("/", apiLimiter, [
    require("./util/util").authenticated(), // catch headers, get user data
	require("./server/routes/heroes.js") // heroes api
])

app.listen(3000, () => {
    console.log("run on 3000")
})

module.exports = app