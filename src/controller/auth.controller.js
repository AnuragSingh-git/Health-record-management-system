import user from "../model/user.model.js";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"
import user from "../model/user.model.js";


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
const login=(req,res)=>{
    const {name,email,password}=req.body
    if(!name&&!email){
        return res.status(401).json({message:"fill one of the two field"})
    }
    const user=user.find({$or{name,email}})

    if(!user){
        res.status(404).json({message:"user not found"})
    }

    const userexist=bycrpt.compare(password,user.password)
    if(!userexist){
        res.status(401).json({message:"wrong password"})
    }

    const accesstoken=jwt.sign({name,email},"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
        {expiresIn:"15min"}
    )
}
export default register