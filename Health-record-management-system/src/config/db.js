import mongoose from "mongoose"

const connecttodb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to database")
    }
    catch(error){
        console.log(error)
    }
}
export default connecttodb
