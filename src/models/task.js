const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

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
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
},
{
    timestamps : true
})

const Tasks = mongoose.model('Tasks',taskSchema)

module.exports = Tasks