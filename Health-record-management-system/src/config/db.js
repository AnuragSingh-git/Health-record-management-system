import mongoose from "mongoose"

const connecttodb = async ()=>{
    try{
        await mongoose.connect("mongodb://anurag28singh88_db_user:ouzrA9tqpy9jfN5o@ac-mvm2oxt-shard-00-00.pklm9ct.mongodb.net:27017,ac-mvm2oxt-shard-00-01.pklm9ct.mongodb.net:27017,ac-mvm2oxt-shard-00-02.pklm9ct.mongodb.net:27017/?ssl=true&replicaSet=atlas-14e5ud-shard-0&authSource=admin&appName=ProjectDB")
        console.log("conected to database")
    }
    catch(error){
        console.log(error)
    }
}
export default connecttodb
