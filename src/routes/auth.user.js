import express, { Router } from "express"
import { login, logincontroller, register, registercontroller } from "../controller/auth.controller.js"

const route = express.Router()

route.post('/register',registercontroller)

route.post('/login',logincontroller)

export default route