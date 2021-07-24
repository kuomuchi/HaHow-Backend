const express = require("express")
const app = express()
const { apiLimiter } = require("./limiter_ rule")



app.use("/", express.static('public'))

app.use("/", apiLimiter, [
    require("./util/util").authenticated(), // catch headers, get user data
	require("./server/routes/heroes.js")
])

app.listen(3000, () => {
    console.log("run on 3000")
})