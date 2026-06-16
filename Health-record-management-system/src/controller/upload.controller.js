import {ImageKit} from '@imagekit/nodejs';
import filemodel from '../model/file.user.js';
import user from '../model/user.model.js';

const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT"
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
        url:file.url,
        fileId: file.fileId
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
    }).populate("user")

    const userlogedin=await user.findById(req.user.id)

    if(record.length==0){
        return res.status(404).json({
            message:"No file uploaded found"
        })
    }

    res.status(200).json({
        username:userlogedin.name,
        record:record
    })}catch(error){
        return res.status(500).json({
            message:"file server error",
            error:error
        })
    }
}

export const Deleterecord=async (req,res)=>{
    try {
        const record = await filemodel.findById(req.params.id);

        if (!record) {
            return res.status(404).json({
                message: "Record not found"
            });
        }

        await imagekit.files.delete(record.fileId);

        await filemodel.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Record deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message:"Delete Failed",
            error:error
        })
    }
}
