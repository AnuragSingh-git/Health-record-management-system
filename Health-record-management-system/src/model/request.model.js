import mongoose from "mongoose";

const requestschema= new mongoose.Schema({
    doctorid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    patientid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
})

const requestmodel=mongoose.model("request",requestschema)

export default requestmodel