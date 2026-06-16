import express from 'express'
import Router from './routes/auth.user.js'
import uploadapi from "./routes/file.route.js"
import cookieParser from 'cookie-parser'
import requestrouter from './routes/request.route.js'
import cors from 'cors'

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://health-record-management-system-three.vercel.app",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.set("trust proxy", 1);

app.use('/api/auth',Router)
app.use('/api/records',uploadapi)
app.use("/api/request",requestrouter)

export default app