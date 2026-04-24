import express from "express"
import {gotrequest, seekrequest} from "../controller/request.controller.js"
import authmiddleware from "../middleware/auth.middleware.js"

const requestrouter=express.Router()

requestrouter.post("/send",authmiddleware,seekrequest)

requestrouter.post("/seerequest",authmiddleware,gotrequest)

export default requestrouter