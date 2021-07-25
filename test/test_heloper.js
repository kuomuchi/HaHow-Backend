const {
	dropCollect,
	selectData
} = require("../server/models/mongodb")

async function dropData(){
	const collect = "heroes"

	const isCollect = await selectData({}, collect)
	if(isCollect.length){
		await dropCollect(collect)
	}

	const reSend = await selectData({}, collect)
	return !(reSend.length >= 1)
}

const dataType = {
	"Content-Type": "application/json"
}


module.exports ={
	dropData,
	dataType
}