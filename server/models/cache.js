const NodeCache = require( "node-cache" ) //Cache
const myCache = new NodeCache()

const {
    getAllHero,
    getHeroProfile
} = require("./get_hero_data")

async function setProfile(num, id, obj){ // set all hero profile an a obj

    const heroId = id[num]
    let data = await getHeroProfile(heroId)

    if(data.status !== 200){ // if fail, catch data again
        return setProfile(num, id, obj)
    }

    obj[heroId] = await data.json()
    
    if(num < 1){
        return obj
    }else{
        return setProfile(num - 1, id, obj)
    }
}

async function combineHero(){ // updata hero data to cache
    const data = await getAllHero()
    const allId = data.map((x) => {return x.id})

    const profile = await setProfile(allId.length - 1, allId, {})


    for(let num = 0; num < data.length; num++){
        data[num].profile = profile[data[num].id]
    }
    
    myCache.set("heroes", data)

    console.log(data)

    return
}

module.exports = {
    myCache,
    combineHero
}