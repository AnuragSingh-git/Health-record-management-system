import express from "express"
import uploadingfile from "../controller/upload.controller.js"
import multer, { memoryStorage } from "multer"

const fileapi=express.Router()
const upload=multer({storage:multer.memoryStorage()})

fileapi.post("/upload",upload.single("file"),uploadingfile)

export default fileapi