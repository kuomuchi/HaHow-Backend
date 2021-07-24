const {myCache} = require("./cache")

async function getHero(status, heroId){

    const hero = myCache.get("heroes")
    let reSend = [...hero] // shallow copy

    if(heroId && !isNaN(heroId)){ // if id is true

        const index = hero.findIndex(element => element.id === heroId) // get hero array index
        if(index === -1){
            return {code: 1000, msg: "Hero Id is not found"}
        }
        
        reSend = reSend[index]

        if(!status){ // if authority false delete profile
            delete reSend.profile
        }
        
    }else{ // if id is false, send all hero

        if(!status){ // if authority false delete profile
            reSend.map((obj) => {delete obj.profile})
        }
            
    }
    
    return reSend
    
}


module.exports = {
    getHero
}