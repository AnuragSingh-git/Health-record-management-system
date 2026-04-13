import app from './src/app.js'
import database from './src/config/db.js'

database()

app.listen(3000,()=>{
    console.log("hello")
})
