import {ImageKit} from '@imagekit/nodejs';
import filemodel from '../model/file.user.js';

const imagekit=new ImageKit({
    privateKey:'private_tdCKyL9HGfbAw4hqvAiDHbR0I/s=',
    publicKey:"public_xxrecE1Cz6IhnjD5aiVZ5Ayj2XM=",
    urlEndpoint:"https://ik.imagekit.io/AnuraSingh"
})

export const uploadingfile=async (req,res)=>{
    try{
        if (!req.file) {
        return res.status(400).json({
        message: "No file uploaded"
        });
        }
        const file=await imagekit.files.upload({
        file:req.file.buffer.toString("base64"),
        fileName:req.file.originalname
        })

        const urlsave=await filemodel.create({
        user:req.user.id,
        recordname:req.body.recordname,
        date:req.body.date,
        url:file.url
        })
        res.status(200).json({
            message:"fileuploaded",
            fileurl:file.url
        })
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                message:"uploading error",
                error:error
            })
        }
        }

export const getrecord=async(req,res)=>{
    try{
        const record=await filemodel.find({
        user:req.user.id
    })

    if(record.length==0){
        return res.status(404).json({
            message:"No file uploaded found"
        })
    }

    res.status(200).json({
        record:record
    })}catch(error){
        return res.status(500).json({
            message:"file server error",
            error:error
        })
    }
}