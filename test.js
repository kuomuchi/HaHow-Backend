const { updataData, selectData } = require("./server/models/mongodb")

const obj = {name: "greate"}
selectData(obj, "test")


const testdd = {
    name: 'greate'
}
// updataData(testdd, testdd, "test")