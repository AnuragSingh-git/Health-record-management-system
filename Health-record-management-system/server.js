import app from './src/app.js'
import connectodatabase from './src/config/db.js'
import dotenv from "dotenv"

dotenv.config()

connectodatabase()

app.listen(3000,()=>{
    console.log("hello")
})
