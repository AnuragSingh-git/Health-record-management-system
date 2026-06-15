import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    name:String,
    email:String,
    password:String,
    record:String,
    role:{
        type:String,
        enum:["patient","doctor"],
        required:true,
        default:"patient"
    },
    age:Number
})

const user=mongoose.model("user",userschema)

export default user

