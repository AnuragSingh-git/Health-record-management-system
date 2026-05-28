import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    record:String,
    role:{
        type:String,
        enum:["patient","doctor"],
        require:true,
        default:"patient"
    },
    age:Number
})

const user=mongoose.model("user",userschema)

export default user

