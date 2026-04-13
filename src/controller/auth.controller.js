import mongoose from "mongoose";
import user from "../model/user.model.js";

const register= async (req,res)=>{
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
        }
        )
    }
    try{const usercreated=
        await user.create({
        name:name,
        email:email,
        password:password
    })}
    catch(error){
        console.log(error)
    }
    res.status(201).json({
        message:"user created"
    })
}
export default register