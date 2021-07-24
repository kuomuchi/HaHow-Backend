const fetch = require("node-fetch")

const sendType = { // fetch data type
    method: 'GET',
    headers:{
        "Content-Type": "application/json"
    }
}

function getHeroProfile(heroId){ // catch single hero profile
    return new Promise((resolve, reject) => {
        const data = fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,sendType).catch((err) => {
            reject(err)
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

module.exports = {
    getHeroProfile,
    getAllHero
}