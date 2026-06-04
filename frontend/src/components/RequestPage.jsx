import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export const RequestPage = () => {
    const { id } = useParams()
    const [searcheduser, setsearcheduser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
        try{const patientdetails=await api.get(`/api/request/patient/${id}`)
            setsearcheduser(patientdetails.data)
        } catch (error) {
            if (error.response?.data?.Code === "no request") {
                setsearcheduser({ status: "no request" })
                console.error("Request not found")
            }
            else if (error.response?.data?.Code === "no permission") {
                setsearcheduser({ status:error?.response?.data?.reason})
                console.error("No permission given")
            }
            else if(error.response.data.Code==="no data uploaded"){ 
                setsearcheduser({ status: "no data uploaded" })
                console.error("No data uploaded")
            }
            else {
                console.error(error.response?.data || error.message)
            }
        }
    }
        fetchUser()
    }, [id])

    const sendrequesthandle=async ()=>{
        try{
            await api.post(`/api/request/send/${id}`)
            setsearcheduser({status:"pending"})
        }catch(err){
            console.log(err.response?.data || err.message)
        }
    }

    return (
    <div className='h-screen w-screen flex bg-blue-400 items-center justify-center'>
        <div className='flex flex-col gap-2'>{searcheduser?.status==="no request"&&<div className='text-center border rounded-xl p-2 bg-yellow-600 text-5xl'>Request not found</div>&&
            <div onClick={sendrequesthandle} className='text-center border rounded-xl p-2 bg-red-600'>Send Request</div>}</div>
        <div>{searcheduser?.status==="no data uploaded"&&<div className='text-center border rounded-xl p-2 bg-blue-600'>No data uploaded</div>}</div>
        <div>{searcheduser?.status==="pending"&&<div className='text-center border rounded-xl p-2 bg-red-600'>Your request is pending</div>}</div>
        <div>{searcheduser?.status==="approved"&&<div className='text-center border rounded-xl p-2 bg-green-600'>Your request is approved</div>}</div>
        <div>{searcheduser?.status==="rejected"&&<div className='text-center border rounded-xl p-2 bg-gray-600'>Your request is rejected</div>}</div>
        <div>{searcheduser?.status==="approved"&&<button className='bg-gray-600 rounded-xl p-2'>See Records</button>}
        </div>
    </div>
  )
}
