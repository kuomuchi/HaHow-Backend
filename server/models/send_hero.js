const {myCache} = require("./cache")
const {selectData} = require("./mongodb")

async function getHero(status, heroId){

    const hero = myCache.get("heroes")
    let reSend

    if(!hero){ // if cache is null
        reSend = await selectData({}, "heroes")
        
        if(reSend.length < 1){ // if db is null
            reSend = require("./hero_ default_data") 
        }

    }else{
        reSend = [...hero] // shallow copy
    }
    

    if(heroId && !isNaN(heroId)){ // HeroId is true

        const index = reSend.findIndex(element => element.id === heroId) // get hero array index

        if(index === -1){ // false hero is not found
            return {code: 1000, msg: "Hero Id is not found"}
        }
        
        reSend = reSend[index]

        if(!status){ // authority is false, delete profile
            delete reSend.profile
        }
        
    }else{ // id is false, send all hero

        if(!status){ // authority false delete profile
            reSend.map((obj) => {delete obj.profile})
        }
            
    }
    
    return reSend
    
}


module.exports = {
    getHero
}