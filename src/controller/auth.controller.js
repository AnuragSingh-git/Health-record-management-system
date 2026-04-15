import user from "../model/user.model.js";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"


const register= async (req,res)=>{
    try{
    const {name,email,password}=req.body

    if(!name||!email||!password){
        return res.status(400).json({message: "fill all field"})
    }
    const userexist=await user.findOne({
            email:email
        })
    if(userexist){
        return res.status(400).json({
            message: "user already exist"
        })
    }
    const hash=await bycrpt.hash(password,10)
    const usercreated= await user.create({
        name:name,
        email:email,
        password:hash
    })
    const token=jwt.sign({
        name,
        email
    },"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
    {expiresIn:"1d"})

    cookie("Token",token)
    
    res.status(201).json({
        message:"user created",
        user:usercreated,
        Token:token
    })}
    catch(error){
        console.log(error)
    }
}
export default register