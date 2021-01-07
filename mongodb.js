// CRUD create read update delete

const {mongodb, MongoClient, ObjectId} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const database = 'task-manager'

MongoClient.connect(connectionURL,{ useNewUrlParser : true}, (error, client)=>{
    if (error){
        return console.log("Unable to connect to DB !")
    }
    
    console.log("DB Connected Successfully...")
    const db = client.db(database)
//    deleteMany docs
    db.collection('tasks').deleteOne({
        description : "Note Creation"
    }).then((res)=>{
        console.log('data deleted successfully !')
    }).catch((err)=>{
        console.log(err)
    })
})