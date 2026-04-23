import express from "express"
import seekrequest from "../controller/seekrequest.controller.js"
import authmiddleware from "../middleware/auth.middleware.js"

const requestrouter=express.Router()

requestrouter.post("/send",authmiddleware,seekrequest)

export default requestrouter