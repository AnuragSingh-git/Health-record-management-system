import express from 'express'
import Router from './routes/auth.user.js'

const app=express()
app.use(express.json())

app.use('/api/auth',Router)

export default app