import express from 'express'
import Router from './routes/auth.user.js'
import uploadapi from "./routes/file.route.js"

const app=express()
app.use(express.json())

app.use('/api/auth',Router)
app.use('/api/upload',uploadapi)

export default app