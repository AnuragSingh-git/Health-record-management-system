import filemodel from "../model/file.user.js";
import requestmodel from "../model/request.model.js";
import user from "../model/user.model.js";

export const checkuserexist=async (req,res)=>{
    try{const usercheck=req.params.id

    const checkpatient=await user.findOne({_id:usercheck})

    if(!checkpatient){
        return res.status(404).json({
            message:"patient not found"
        })
    }

    res.status(200).json({
        patientname:checkpatient.name,
        id:checkpatient._id
    })}catch(error){
        console.log(error)
    }
}

export const seerecord=async (req,res)=>{
    const permission=await requestmodel.findOne({
        doctorid:req.user.id,
        patientid:req.params.id
    })

    if(!permission){
        return res.status(404).json({
            Code:"no request",
            message:"User have no request"
        })
    }

    if(permission.status=="pending"||permission.status=="rejected"){
        return res.status(403).json({
            reason:permission.status,
            Code:"no permission",
            message:"no permission given"
        })
    }

    const data=await filemodel.findById(
        req.param.id
    )

    if(!data){
        return res.status(404).json({
            Code:"no data uploaded",
            message:"no user data uploaded"
        })
    }

    res.status(200).json({
        data:data
    })
}

export const seekrequest=async (req,res)=>{
    const patientid=req.params.id

    const checkpatient=await user.find({_id:patientid})

    if(!checkpatient){
        return res.status(404).json({
            message:"patient not found"
        })
    }

    const createrequest=await requestmodel.create({
        patientid:patientid,
        doctorid:req.user.id
    })

    res.status(200).json({
        message:"request created",
        request:createrequest
    })
}

export const gotrequest=async (req,res)=>{
    const patientid=req.user.id

    const requestgot=await requestmodel.find({
        patientid
    }).populate("doctorid")

    if(requestgot.length===0){
        return res.status(404).json({
            message:"no request found"
        })
    }
    res.status(200).json({
        message:"request found",
        requestgot:requestgot
    })
}

export const givepermission=async (req,res)=>{
    try{
        const request=await requestmodel.findOne({
        doctorid:req.body.doctorid
    })

    if(!request){
        return res.status(404).json({
            message:"No request found"
        })
    }
    request.status="approved"
    await request.save()

    res.status(200).json({
        message:"request approved"
    })
    }catch(error){
    return res.status(500).json({
        message:"Server error",
        error:error
    })
}
}

export const revokepermission=async (req,res)=>{
    try{
        const request=await requestmodel.findOne({
        doctorid:req.body.doctorid
    })

    if(!request){
        return res.status(404).json({
            message:"No request found"
        })
    }
    request.status="rejected"
    await request.save()

    res.status(200).json({
        message:"request rejected"
    })
    }catch(error){
    return res.status(500).json({
        message:"Server error",
        error:error
    })
}
}

export const deletepermission=async (req,res)=>{
    try{
        const request=await requestmodel.findOneAndDelete({
        doctorid:req.body.doctorid
    })
    if(!request){
        return res.status(404).json({
            message:"No request found"
        })
    }
    res.status(200).json({
        message:"request deleted"
    })
    }catch(error){
    return res.status(500).json({
        message:"Server error",
        error:error
    })
}
}