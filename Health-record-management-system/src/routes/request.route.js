import express from "express"
import {checkuserexist, givepermission, gotrequest, seekrequest, seerecord} from "../controller/request.controller.js"
import authmiddleware from "../middleware/auth.middleware.js"

const requestrouter=express.Router()

requestrouter.get("/search/:id",authmiddleware,checkuserexist)

requestrouter.get("/patient/:id",authmiddleware,seerecord)

requestrouter.post("/send/:id",authmiddleware,seekrequest)

requestrouter.get("/getrequests",authmiddleware,gotrequest)

requestrouter.post("/permission",authmiddleware,givepermission)    

export default requestrouter