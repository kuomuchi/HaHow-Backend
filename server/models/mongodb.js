require('dotenv').config()

const mongo = require('mongodb').MongoClient;
const {
    mongodbURL,
    mongodbDatabases
} = process.env

const url = mongodbURL

function selectData(obj, collection){ // select databases

    return new Promise( (resolve) => {
    
        mongo.connect(url, (err, db) => {
            if(err) throw err
        
            const dbo = db.db(mongodbDatabases)
        
            dbo.collection(collection).find(obj, {projection:{ _id: 0 }}).toArray((err, res) => {
                if(err) throw err
        
                db.close
                resolve(res)
        
            })
    
        })
    })
  
}


function insertData(obj, collection){ // insert data in to databases

    return new Promise( (resolve) => {

        mongo.connect(url, (err, db) => {
            if (err) throw err
            
            const dbo = db.db(mongodbDatabases)
            
            dbo.collection(collection).insertOne(obj, (err, res) => {
                if (err) throw err
        
                console.log("insert into db")
                db.close()
                resolve(res)

            })
        
        })
    })
}

function deleteData(obj, collection){ // delete data

    return new Promise((resolve) => {
        mongo.connect(url, function(err, db) {
            if (err) throw err
        
            let dbo = db.db(mongodbDatabases)
        
            dbo.collection(collection).remove(obj, (err, res) => {
                if (err) throw err
        
                console.log("delete data")
                db.close()
                resolve(res)
            })
        })
    })
}


function updateData(select, obj, collection){ // update data

    return new Promise((resolve) => {

        mongo.connect(url, function(err, db) {
            if (err) throw err;
            const dbo = db.db(mongodbDatabases);
            const newvalues = { $set: obj }
            dbo.collection(collection).updateOne(select, newvalues, (err, res) => {
                if (err) throw err
                
                console.log("update")
                db.close()
                resolve(res)
            })
        })
    })
}


function dropCollect(collection){ // drop Collect

    return new Promise( (resolve) => {

        mongo.connect(url, function(err, db) {
            if (err) throw err
            const dbo = db.db(mongodbDatabases)
        
            dbo.collection(collection).drop(function(err, res) {
                if (err) throw err
            
                console.log("drop:" + collection)
                db.close()

                resolve(res)
        
            })
        })
    })
    
}



  

module.exports = {
    selectData,
    insertData,
    deleteData,
    updateData,
    dropCollect
}