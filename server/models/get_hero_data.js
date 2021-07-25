const fetch = require("node-fetch")
const { updateData, selectData, insertData} = require("./mongodb")

const sendType = { // fetch data type
    method: 'GET',
    headers:{
        "Content-Type": "application/json"
    }
}

function getHeroProfile(heroId){ // catch single hero profile
    return new Promise((resolve, reject) => {
        const data = fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,sendType).catch((err) => {
            if(err)throw err

            reject(false)
        })
        resolve(data)
    })
}

async function getAllHero(){ // catch all hero
    let url = "https://hahow-recruit.herokuapp.com/heroes"
    let heroData = await fetch(url, sendType)
    heroData = await heroData.json()
    return heroData
}

async function upDateHeroes(array, num, collect){ // update hero to MongoDB

    if(num > array.length - 1){ // when update all hero
        return "finish"
    }

    if((array[num].id === undefined) || (array[num].name === undefined) || (array[num].profile.luk === undefined)){ // check input data type
        return "data err"
    }

    const select = { // select Hero id
        id : array[num].id
    }

    const haveHero = await selectData(select, collect) // catch old hero

    if(haveHero.length){ // if hero is true, update it
        await updateData(select, array[num], collect)

    }else{ // invite a hero
        await insertData(array[num], collect)
    }

    num++
    return upDateHeroes(array, num, collect)
}

module.exports = {
    getHeroProfile,
    getAllHero,
    upDateHeroes
}