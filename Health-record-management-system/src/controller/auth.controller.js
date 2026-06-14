import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"
import user from "../model/user.model.js";


export const registercontroller= async (req,res)=>{
    try{
    const {email,password,age,name,role}=req.body

    if(!email || !password || !name || !role || !age){
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
    const hash=await bcrypt.hash(password,10)
    const usercreated= await user.create({
        name:name,
        age:age,
        email:email,
        role:role,
        password:hash
    })

    const refreshtoken=jwt.sign({
        id:usercreated._id,
        email
    },"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
        {expiresIn:"1d"}
    )
    const accesstoken=jwt.sign({
        id:usercreated._id,
        email
    },"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
    {expiresIn:"1d"})

    res.cookie("Refreshtoken",refreshtoken)
    res.cookie("Accesstoken",accesstoken)

    res.status(201).json({
        message:"user is created",
        user:usercreated,
        Token:accesstoken
    })}
    catch(error){
        return res.status(500).json({
        message: "server error",
        error: error.message
        })
}}
export const logincontroller=async (req,res)=>{
    const {name,email,password}=req.body
    if(!password||!email){
        return res.status(401).json({message:"fill both field"})
    }
    const finduser=await user.findOne({$or: [{email}]})

    if(!finduser){
        return res.status(404).json({message:"user not found"})
    }

    const userexist=await bcrypt.compare(password,finduser.password)
    if(!userexist){
        return res.status(401).json({message:"wrong password"})
    }

    const refreshtoken=jwt.sign({id:finduser._id,email},"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
        {expiresIn:"1d"}
    )

    const accesstoken=jwt.sign({id:finduser._id,email},"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
        {expiresIn:"1d"}
    )
    res.cookie("Accesstoken",accesstoken)

    res.cookie("Refreshtoken",refreshtoken).json({
        message:"user logged in",
        user:finduser,
        accesstoken,
        refreshtoken
    })
}

export const getuser=async (req,res)=>{
    const searchuser=await user.findOne({_id:req.user.id})
    res.status(200).json({user:searchuser})
}
