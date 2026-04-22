import app from './src/app.js'
import connectodatabase from './src/config/db.js'

connectodatabase()

app.listen(3000,()=>{
    console.log("hello")
})
