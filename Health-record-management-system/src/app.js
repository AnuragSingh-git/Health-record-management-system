import express from 'express'
import Router from './routes/auth.user.js'
import uploadapi from "./routes/file.route.js"
import cookieParser from 'cookie-parser'
import requestrouter from './routes/request.route.js'
import cors from 'cors'

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(null))

app.use('/api/auth',Router)
app.use('/api/upload',uploadapi)
app.use("/api/request",requestrouter)

export default app