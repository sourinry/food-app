const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "user name is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        select: false
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true, "phone is required"]
    },
    userType:{
        type:String,
        required:[true, "userType is required"],
        default: 'client',
        enum:['client', 'admin', 'vendor', 'driver']
    },
    answer:{
        type: String,
        required: [true, "answer must br provided"]
    }
}, {timestamps:true});

module.exports = mongoose.model("User", userSchema);