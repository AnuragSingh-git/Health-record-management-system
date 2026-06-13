import express from "express"
import {checkuserexist, givepermission, gotrequest, seekrequest, seerecord, revokepermission, deletepermission} from "../controller/request.controller.js"
import authmiddleware from "../middleware/auth.middleware.js"

const requestrouter=express.Router()

requestrouter.get("/search/:id",authmiddleware,checkuserexist)

requestrouter.get("/patient/:id",authmiddleware,seerecord)

requestrouter.post("/send/:id",authmiddleware,seekrequest)

requestrouter.get("/getrequests",authmiddleware,gotrequest)

requestrouter.post("/permission",authmiddleware,givepermission)

requestrouter.post("/revokepermission",authmiddleware,revokepermission)

requestrouter.delete("/deletepermission",authmiddleware,deletepermission)

export default requestrouter