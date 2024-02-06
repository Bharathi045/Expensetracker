const  {MongoClient} = require('mongodb')
let dbConnection
function connectToDb(callBack) {
    dbConnection = MongoClient.connect('mongodb+srv://Bharathi:Viper045@cluster0.byzxq3x.mongodb.net/Expensetracker?retryWrites=true&w=majority').then(function(client){
        dbConnection = client.db()
        callBack()
    }).catch(function(error){
        callBack(error)
    })
}
function getDb() {
    return dbConnection
}
// Exporting the required functions
module.exports = {connectToDb, getDb} // export allows to use the files on other files