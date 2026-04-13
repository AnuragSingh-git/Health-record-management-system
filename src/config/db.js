import mongoose from "mongoose"

const database = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://anurag28singh88_db_user:ouzrA9tqpy9jfN5o@projectdb.pklm9ct.mongodb.net/")
        console.log("conected to database")
    }
    catch(error){
        console.log(error)
    }
}
export default database
