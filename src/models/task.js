const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
    task_name : {
        type : String,
        required : true,
        trim : true

    },
    task_description : {
        type : String,
        required : true,
        trim : true
    },
    task_status : {
        type : Boolean,
        default : false
    }
})

const Tasks = mongoose.model('tasks',taskSchema)

module.exports = Tasks