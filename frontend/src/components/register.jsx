import React from 'react'
import { useState } from 'react'
import api from '../services/api'
import { Navigate, useNavigate } from 'react-router-dom'

function register() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [age, setage] = useState(0)
    const [role, setrole] = useState("patient")
    const Navigate=useNavigate()

    const handlesubmit=async (e)=>{
        e.preventDefault()
        await api.post('/api/auth/register',{name,email,password,age,role}).then((res)=>{
            console.log(res.data)
            Navigate("/")
        }).catch((err)=>{
            console.log(err.response?.data||err.message)
        })
    }
  return (
    <div className='flex flex-row bg-[url("https://images.unsplash.com/photo-1641160923894-b1a80920187d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] h-full w-full rounded-xl items-center justify-center'>
    <form className='flex flex-col h-[90%] w-[80%] rounded-xl items-center justify-center border bg-amber-50 gap-4' onSubmit={handlesubmit}>
    <div className='flex flex-col h-2/3 w-1/2 rounded-lg items-center justify-center border bg-amber-50 gap-4'><input onChange={(e) => setusername(e.target.value)} className='border h-10 w-60 rounded-lg text-center' type='text' placeholder='Username (e.g. john123)'/>
        <input onChange={(e)=>{setname(e.target.value)}} className='border h-10 w-60 rounded-lg text-center' type='text' placeholder='name'/>
        <input onChange={(e)=>{setemail(e.target.value); console.log(email)}} className='border h-10 w-60 rounded-lg text-center' type='email' placeholder='email'/>
        <input onChange={(e)=>{setage(Number(e.target.value))}} className='border h-10 w-60 rounded-lg text-center' type='number' placeholder='Age'/>
        <select value={role} onChange={(e) => setrole(e.target.value)} className="border h-10 w-60 rounded-lg text-center">
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        </select>
        <input onChange={(e)=>{setpassword(e.target.value)}} className='border h-10 w-60 rounded-lg text-center' type='password' placeholder='password'/>
        <button className='bg-blue-400 h-8 w-27 rounded-xl' type='submit'>Register</button></div>
    </form></div>
  )
}

export default register