import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"
import user from "../model/user.model.js";


export const registercontroller= async (req,res)=>{
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
    const hash=await bcrypt.hash(password,10)
    const usercreated= await user.create({
        name:name,
        email:email,
        password:hash
    })

    const refreshtoken=jwt.sign({
        id:usercreated._id,
        name,
        email
    },"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
        {expiresIn:"1d"}
    )
    const accesstoken=jwt.sign({
        id:usercreated._id,
        name,
        email
    },"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
    {expiresIn:"1d"})

    res.cookie("Refreshtoken",refreshtoken)
    res.cookie("Accesstoken",accesstoken)

    res.status(201).json({
        message:"user created",
        user:usercreated,
        Token:accesstoken
    })}
    catch(error){
        console.log(error)
    }
}
export const logincontroller=async (req,res)=>{
    const {name,email,password}=req.body
    if(!name&&!email){
        return res.status(401).json({message:"fill one of the two field"})
    }
    const finduser=await user.findOne({$or: [{name},{email}]})

    if(!finduser){
        return res.status(404).json({message:"user not found"})
    }

    const userexist=await bcrypt.compare(password,finduser.password)
    if(!userexist){
        return res.status(401).json({message:"wrong password"})
    }

    const refreshtoken=jwt.sign({id:finduser._id,name,email},"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
        {expiresIn:"1d"}
    )

    const accesstoken=jwt.sign({id:finduser._id,name,email},"MPcHQouySHaRd2aU4pK8efeMaiDogEL2MCySxAuDt3I",
        {expiresIn:"15m"}
    )
    res.cookie("Accesstoken",accesstoken)

    res.cookie("Refreshtoken",refreshtoken).json({
        message:"user logged in",
        accesstoken,
        refreshtoken
    })
}
