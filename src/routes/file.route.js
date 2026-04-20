import express from "express"
import uploadingfile from "../controller/upload.controller.js"
import multer, { memoryStorage } from "multer"
import authmiddleware from "../middleware/auth.middleware.js"

const fileapi=express.Router()
const upload=multer({storage:multer.memoryStorage()})

fileapi.post("/upload",authmiddleware,upload.single("file"),uploadingfile)

export default fileapi