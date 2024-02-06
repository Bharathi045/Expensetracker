const express = require('express')
// Importing the required functions from dbConnection.cjs
const {connectToDb, getDb} = require('./dbconnect.cjs')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// app.get('/', function(request, response) {
//     response.send('working fine...')
// })
let db
connectToDb(function(error){
    if(error) {
        console.log('could not establish connection')
        console.log(error)
    } else{
        app.listen(8000)
        db= getDb()
        console.log('Listening on port 8000')
    }
    
})
app.post('/add-entry', function(request, response) {
    // console.log(request.body)
    db.collection('ExpensesData').insertOne(request.body).then(function() {
        response.status(201).json({
            "status" : "Entry added successfully"
        })
    }).catch(function () {
        response.status(500).json({
            "status" : "Entry not added"
        })
    })
})
app.get('/get-entries', function(request, response) {
    // Declaring an empty array
    const entries = []
    db.collection('ExpensesData')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function() {
        response.status(404).json({
            "status" : "Could not fetch documents"
        })
    })
})
app.delete('/delete-entry', function(request, response) {
    if(ObjectId.isValid(request.query.id)) {
        db.collection('ExpensesData').deleteOne({
            _id : new ObjectId(request.query.id)
        }).then(function() {
            response.status(200).json({
                "status" : "Entry successfully deleted"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Entry not deleted"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})
app.patch('/update-entry/:id'),function(request,response){
    db.collection('Expensesdata').updateOne(
        {_id:new Object(request.params.id)},
        {$set:request.body}
    )
}

