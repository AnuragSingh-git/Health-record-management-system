import requestmodel from "../model/request.model.js";
import user from "../model/user.model.js";

const seekrequest=async (req,res)=>{
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
export default seekrequest