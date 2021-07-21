const fetch = require("node-fetch")

const sendType = {
    method: 'GET',
    headers:{
        "Content-Type": "application/json"
    }
}

function getHeroProfile(heroId){
    return new Promise((resolve, reject) => {
        const data = fetch(`https://hahow-recruit.herokuapp.com/heroes/${heroId}/profile`,sendType).catch((err) => {
            reject(err)
        })
        resolve(data)
    })
}


async function getHero(status, heroId){
    
    let url = "https://hahow-recruit.herokuapp.com/heroes"

    if(heroId && !isNaN(heroId)){
        url += `/${heroId}`
    }

    let heroData = await fetch(url, sendType)

    heroData = await heroData.json()

    //if login
    if(status){
        if(!heroData.length){
            await getHeroProfile(heroData.id).then(async(res) => {
                heroData.profile = await res.json()
            })

        }else{
            for(let num = 1; num <= heroData.length; num++){
                await getHeroProfile(num).then(async (res) => {
                    heroData[num - 1].profile = await res.json()
                })
            }
            heroData = {heroes: heroData}
        }
    }

    return heroData
    
    
}

module.exports = {
    getHero
}