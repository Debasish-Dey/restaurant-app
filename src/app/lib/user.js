const { default: mongoose } = require("mongoose");


const userModel= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
    },
    password:String,
    city:String,
    address:String,
    pincode:String,
    contact:String,
});

export const  userSchema= mongoose.models.users
|| mongoose.model("users",userModel);