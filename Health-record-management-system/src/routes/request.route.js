import express from "express"
import {checkuserexist, gotrequest, seekrequest, seerecord} from "../controller/request.controller.js"
import authmiddleware from "../middleware/auth.middleware.js"

const requestrouter=express.Router()

requestrouter.get("/search/:id",authmiddleware,checkuserexist)

requestrouter.get("/data/:id",authmiddleware,seerecord)

requestrouter.post("/send/id",authmiddleware,seekrequest)

requestrouter.post("/seerequest",authmiddleware,gotrequest)

export default requestrouter