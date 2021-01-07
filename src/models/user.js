const mongoose = require('mongoose')
const validator = require('validator')

// User model
const User = mongoose.model("User",{
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
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

    }
})

// const transactionForUser = new User({
//     name : "Sourav",
//     password : "passwor123"
// })

// transactionForUser.save().then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })

module.exports = User