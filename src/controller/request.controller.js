import requestmodel from "../model/request.model.js";
import user from "../model/user.model.js";

export const seekrequest=async (req,res)=>{
    const {patientid}=req.body

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
    })

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