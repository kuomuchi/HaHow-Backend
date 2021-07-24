const cron = require('node-cron');
const {combineHero} = require("./cache")


function stratCatchData(){ // catch heroes data
    combineHero()

    cron.schedule('*/30 * * * *', () => { // each 30min catch 
        combineHero()
    })
}


module.exports = {
    stratCatchData
}