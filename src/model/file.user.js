import mongoose from "mongoose";

const file= new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    url:String
})

const filemodel=mongoose.model("fileurl",file)

export default filemodel