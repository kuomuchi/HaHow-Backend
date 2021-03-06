const NodeCache = require( "node-cache" ) //Cache
const myCache = new NodeCache()

const {
    getAllHero,
    getHeroProfile,
    upDateHeroes
} = require("./get_hero_data")

async function setProfile(num, id, obj){ // set all hero profile an a obj

    const heroId = id[num]
    let data = await getHeroProfile(heroId)

    if(!data){
        return false
    }

    if(data.status !== 200){ // if fail, catch data again
        return setProfile(num, id, obj)
    }

    obj[heroId] = await data.json() // sort data to json
    
    if(num < 1){
        return obj
    }else{
        return setProfile(num - 1, id, obj)
    }
}

async function combineHero(){ // update hero data to cache
    const data = await getAllHero()
    const allId = data.map((x) => {return x.id}) // turn hero id to array
    const key = "heroes"

    const profile = await setProfile(allId.length - 1, allId, {}) // sort hero profile

    if(!profile){ // data err return it
        console.log("data err")
        return false
    }

    for(let num = 0; num < data.length; num++){
        data[num].profile = profile[data[num].id] // combine heroes data
    }
    
    myCache.set(key, data) // set cache

    await upDateHeroes(data, 0, key).then( (res) => {console.log(res)}) // upload data to db

    return true
}

module.exports = {
    myCache,
    combineHero
}