import mongoose from "mongoose";

const file= new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    recordname:String,
    date:Date,
    url:String,
    fileId:String
})

const filemodel=mongoose.model("fileurl",file)

export default filemodel