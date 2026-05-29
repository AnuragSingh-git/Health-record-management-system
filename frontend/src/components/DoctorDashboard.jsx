import React from 'react'
import api from '../services/api'
import { useState , useEffect } from 'react'

export const DoctorDashboard = () => {
  const [user, setuser] = useState({})
  const [userid, setuserid] = useState("")
  const [searcheduser, setsearcheduser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
    try{const userdata = await api.get('/api/auth/getuser')
    if(!userdata){
      return console.log("no user found")
    }
    console.log(userdata.data.user)
    setuser(userdata.data.user)
       }
      catch(err){
      console.log(err.response?.data || err.message)
    }}
    fetchUser() 
  }, [])

  const searchhandle=async (e)=>{
    const patientdetails=await api.get(`/api/request/search/${userid}`)
    if(!patientdetails){
      return console.log("no patient found")
    }
    setsearcheduser(patientdetails.data)
  }
  
  return (
    <div className='h-screen w-screen bg-blue-400 items-center justify-center flex'>
      <div className='h-1/2 w-1/2 flex flex-col bg-amber-50 rounded-4xl border items-center justify-center gap-2'>
        <h1 className='text-2xl font-bold p-2 rounded-xl bg-amber-400 border'>Welcome {user.name}</h1>
        <div>
        {user.role=="doctor"&&<div className='flex flex-col gap-2'><div className='text-center'>Search Patients</div>
        <input type="text" onChange={(e)=>{setuserid(e.target.value)}} className='border' placeholder="Search patients..." />
        <button onClick={searchhandle} className='bg-gray-600 rounded-xl p-2'>Search</button></div>}
        </div>
        </div>
      </div>
  )
}
