import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export const RequestPage = () => {
    const { id } = useParams()
    const [searcheduser, setsearcheduser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
        try{const patientdetails=await api.get(`/api/request/patient/${id}`)
            setsearcheduser(patientdetails)
        } catch (error) {
            console.error(error.response?.data || error.message)
        }
        }
        fetchUser()
    }, [id])

    return (
    <div className='h-screen w-screen bg-blue-400'>
        <div>{searcheduser?.status==="pending"&&<div className='text-center border rounded-xl p-2 bg-red-600'>Your request is pending</div>}</div>
        <div>{searcheduser?.status==="approved"&&<div className='text-center border rounded-xl p-2 bg-green-600'>Your request is approved</div>}</div>
        <div>{searcheduser?.status==="rejected"&&<div className='text-center border rounded-xl p-2 bg-gray-600'>Your request is rejected</div>}</div>
        <div>{searcheduser?.status==="approved"&&<button className='bg-gray-600 rounded-xl p-2'>See Records</button>}
        </div>
    </div>
  )
}
