require('dotenv').config()
const { mongodbDatabases } = process.env

const cron = require('node-cron');
const {combineHero} = require("./cache")


function stratCatchData(){ // catch heroes data

    if(mongodbDatabases !== "test"){
        combineHero()

        cron.schedule('*/30 * * * *', () => { // each 30min catch 
            combineHero()
        })
    }
}


module.exports = {
    stratCatchData
}