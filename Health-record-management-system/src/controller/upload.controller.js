import {ImageKit} from '@imagekit/nodejs';
import filemodel from '../model/file.user.js';

const imagekit=new ImageKit({
    privateKey:'private_tdCKyL9HGfbAw4hqvAiDHbR0I/s=',
    publicKey:"public_xxrecE1Cz6IhnjD5aiVZ5Ayj2XM=",
    urlEndpoint:"https://ik.imagekit.io/AnuraSingh"
})

export const uploadingfile=async (req,res)=>{
    try{const file=await imagekit.files.upload({
        file:req.file.buffer.toString("base64"),
        fileName:req.file.originalname
    })

const urlsave=filemodel.create({
    user:req.user.id,
    url:file.url
})
    res.status(200).json({
        message:"fileuploaded",
        fileurl:file.url
    })
}
catch(error){
    console.log(error)
}
}

export const getrecord=async(req,res)=>{
    try{
        const record=await filemodel.find({
        user:req.user._id
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