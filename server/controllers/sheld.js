const { getHero } = require("../models/send_hero")

async function catchHeroesData(req, res){
    const { heroId } = req.params // get hero id
    const { userInfo } = req // get user info
    
    const hero = await getHero(userInfo.admin, heroId)

    res.send(hero)
}


module.exports = {
    catchHeroesData
}