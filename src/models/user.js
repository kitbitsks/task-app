const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const Tasks = require('../models/task')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid !")
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minLength : 6,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("password cannot contain 'password'")
            }
        }
    },
    age:{
        type : Number,
        required : false,
        trim : true,
        default : 0,
        validate(value){
            if (value < 0){
                throw new Error("Age must be Positive Number !")
            }
        }

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
{
    timestamps : true
})

userSchema.virtual('tasks', {
    ref : 'Tasks',
    localField : '_id' ,
    foreignField : 'owner'
})

userSchema.pre("save", async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre("remove", async function(next){
    const user = this
    await Tasks.deleteMany({'owner': user._id})
    next()
})

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({'_id' : (user._id).toString()}, "taskApplication2021")
    user.tokens = user.tokens.concat({ token })
    await user.save() 
    return token
}

userSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.tokens
    delete userObj.password

    return userObj
}

userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email})
    if (!user){
        return new Error("Unable to login !")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return new Error("Unable to login !")
    }
    return user
}

const User = mongoose.model("User",userSchema)
module.exports = User