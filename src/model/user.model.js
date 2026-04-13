import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    record:String
})

const user=mongoose.model("user",userschema)

export default user

