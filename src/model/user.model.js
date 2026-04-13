import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:string,
    email:string,
    password:string,
    record:string
})

const user=mongoose.model("user",userschema)

export default user

