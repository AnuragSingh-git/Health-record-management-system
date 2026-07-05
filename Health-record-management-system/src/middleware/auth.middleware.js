import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const authmiddleware=(req,res,next)=>{
    const cookie=req.cookies.Accesstoken
    if(!cookie){
        return res.status(401).json({
            message:"No token"
        })
    }
    
    const decoded=jwt.verify(cookie,process.env.SECRET_KEY)

    if(!decoded){
        return res.status(401).json({
            message:"invalid token"
        })
    }
    req.user=decoded
    next()
}
export default authmiddleware
