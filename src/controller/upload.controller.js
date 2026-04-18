import {ImageKit} from '@imagekit/nodejs';
import filemodel from '../model/file.user.js';

const imagekit=new ImageKit({
    privateKey:'private_tdCKyL9HGfbAw4hqvAiDHbR0I/s=',
    publicKey:"public_xxrecE1Cz6IhnjD5aiVZ5Ayj2XM=",
    urlEndpoint:"https://ik.imagekit.io/AnuraSingh"
})

const uploadingfile=async (req,res)=>{
    try{const file=await imagekit.files.upload({
        file:req.file.buffer.toString("base64"),
        fileName:req.file.originalname
    })

const urlsave=filemodel.create({
    user:req.body.id,
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
export default uploadingfile