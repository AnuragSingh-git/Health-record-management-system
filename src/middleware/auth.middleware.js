import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const authmiddleware=(req,res,next)=>{
    const cookie=req.cookies.Accesstoken
    if(!cookie){
        req.status(401).json({
            message:"No token"
        })
    }
    
    const decoded=jwt.verify(cookie,"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I")

    if(!decoded){
        res.status(401).json({
            message:"invalid token"
        })
    }
    req.user=decoded
    next()
}
export default authmiddleware