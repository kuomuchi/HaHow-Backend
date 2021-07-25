const {selectData} = require("./server/models/mongodb")

const obj = {
    id:{ $type: 1 }
}
selectData(obj, "heroes").then((res) => {
    console.log(res)
})
