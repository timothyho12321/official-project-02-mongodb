const MongoClient = require("mongodb").MongoClient;

let _db = null; 

// url is connection string of database
async function connect(url, databaseName){
    let client = await MongoClient.connect(url, {
        useUnifiedTopology:true
    })
    // set the selected database
    _db = client.db(databaseName);
}

function getDB() {
    return _db;
}

// share the connect and getDB functions with other JS files
module.exports = { connect, getDB}