require('dotenv').config()

const mongo = require('mongodb').MongoClient;
const {
    mongodbURL,
    mongodbDatabases
} = process.env

const url = mongodbURL

function selectData(obj, collection){ // select databases

    mongo.connect(url, (err, db) => {
      if(err) throw err
  
      const dbo = db.db(mongodbDatabases)
  
      dbo.collection(collection).find(obj).toArray((err, res) => {
        if(err) throw err
  
        console.log(res)
  
        db.close
  
      })
  
    })
  
}


function insertData(obj, collection){ // insert data in to databases
    mongo.connect(url, (err, db) => {
      if (err) throw err
    
      const dbo = db.db(mongodbDatabases)
    
      dbo.collection(collection).insertOne(obj, (err, res) => {
        if (err) throw err;
  
        console.log("insertData");
        console.log(res)
        db.close();
      })
    
    })
}

function deleteData(obj, collection){ // delete data
    mongo.connect(url, function(err, db) {
      if (err) throw err
  
      let dbo = db.db(mongodbDatabases)
  
      dbo.collection(collection).remove(obj, (err, res) => {
        if (err) throw err
  
        console.log(res)
        db.close()
      })
    })
}


function updataData(select, obj, collection){ // updata data

    mongo.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db(mongodbDatabases);
        const newvalues = { $set: obj }
        dbo.collection(collection).updateOne(select, newvalues, (err, res) => {
        if (err) throw err
        
        console.log(res)
        db.close()
        })
    })
}

module.exports = {
    selectData,
    insertData,
    deleteData,
    updataData
}