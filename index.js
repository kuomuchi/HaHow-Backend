const express = require("express")
const app = express()

app.listen(3000, () => {
    console.log('run on 3000')
})

app.use("/", [
    require("./util/util").authenticated(), // catch headers, get user data
	require("./server/routes/heroes.js")
])