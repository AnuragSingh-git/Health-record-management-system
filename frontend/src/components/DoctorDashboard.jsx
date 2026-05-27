import React from 'react'
import api from '../services/api'
import { useState } from 'react'

export const DoctorDashboard = () => {
  const [user, setuser] = useState({})
  const [userid, setuserid] = useState("")

  useEffect(() => {
    const userdata=api.get("api/auth/getuser")
    if(!userdata){
      return console.log("no user found")
    }
    setuser(userdata)
  }, [])

  const searchhandle=(e)=>{
    const patientdetails=api.get(`/api/search/search/${userid}`)
  }
  
  return (
    <div className='h-screen w-screen bg-blue-400 items-center justify-center flex'>
      <div className='h-1/2 w-1/2 bg-amber-50 rounded-4xl border'>
        <h1 className='text-2xl font-bold'>Welcome {user.name}</h1>
        {user.role=="doctor"&&<div><div>Search Patients</div>
        <input type="text" onChange={(e)=>{setuserid(e.target.value)}} placeholder="Search patients..." />
        <button onClick={searchhandle}>Search</button></div>}
        </div>
      </div>
  )
}
