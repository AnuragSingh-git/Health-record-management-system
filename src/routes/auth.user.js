import express, { Router } from "express"
import register from "../controller/auth.controller.js"

const route = express.Router()

route.post('/register',register)

export default route