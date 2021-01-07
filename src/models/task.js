const mongoose = require('mongoose')
// const validator = require('validator')
// task model
const Tasks = mongoose.model('tasks',{
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

module.exports = Tasks