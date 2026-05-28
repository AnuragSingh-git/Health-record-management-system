import express, { Router } from "express"
import {logincontroller , registercontroller , getuser } from "../controller/auth.controller.js"
import authmiddleware from "../middleware/auth.middleware.js"

const route = express.Router()

route.post('/register',registercontroller)

route.post('/login',logincontroller)

route.get('/getuser',authmiddleware,getuser)

export default route