import app from './src/app.js'
import connectodatabase from './src/config/db.js'
import dotenv from "dotenv"

dotenv.config()

connectodatabase()

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server Start")
})
