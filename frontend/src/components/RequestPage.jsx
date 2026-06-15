import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export const RequestPage = () => {
    const { id } = useParams()
    const [searcheduser, setsearcheduser] = useState({})
    const [records, setrecords] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
        try{const patientdetails=await api.get(`/api/request/patient/${id}`)
            setsearcheduser(patientdetails.data.user)
            console.log(patientdetails.data.user)
            setrecords(patientdetails.data.data)
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
    <div className='h-screen w-screen flex flex-col gap-2 items-center justify-center bg-blue-400'>
        <div className='bg-amber-50 h-[90%] w-[90%] rounded-lg flex shadow-2xl justify-center'>{searcheduser?.status==="no request"&&<div className='flex flex-col items-center justify-center gap-2'><div className='text-center border rounded-xl p-4 bg-yellow-400 text-5xl'>Request not found</div>
        <div onClick={sendrequesthandle} className='text-center border rounded-xl p-2 bg-red-600'>Send Request</div></div>}
        <div className='flex flex-col items-center justify-center gap-2'>{searcheduser?.status==="no data uploaded"&&<div className='text-center border rounded-xl p-2 bg-blue-600'>No data uploaded</div>}</div>
        <div className='flex flex-col items-center justify-center gap-2'>{searcheduser?.status==="pending"&&<div className='text-center border rounded-xl p-4 bg-red-600 text-4xl'>Your request is pending</div>}</div>
        <div className='flex flex-col items-center justify-center gap-2'>{searcheduser?.status==="rejected"&&<div className='text-center border rounded-xl p-2 bg-gray-600'>Your request is rejected</div>}</div>
        <div className='flex flex-col items-center justify-center gap-2'>{searcheduser?.status==="approved"&& (records.length==0 ? (<div className='bg-gray-400 border uppercase p-4 rounded-lg'>No Record Found</div>):
        (<div className='border rounded-lg uppercase m-12 overflow-auto'><div className='bg-gray-400 flex h-19 w-full border justify-center items-center gap-4 px-4'><div className='bg-amber-50 border w-[67%] rounded-lg py-2 px-4 text-center uppercase'>{searcheduser.patientid.name||"Loading"}</div><div className='bg-amber-50 border w-[27%] rounded-lg py-2 px-4 text-center uppercase'>Age: {searcheduser.patientid.age}</div></div>
            {records.map((Data,index)=>(
            <div key={index} className='bg-amber-200 flex justify-center px-4 py-2 items-center gap-4 border rounded-lg m-4'>
            <div className='bg-amber-50 w-120 border flex-1 rounded-lg p-2 text-center uppercase'><a href={Data.url} target="_blank" className='w-full block justify-center'>{Data.recordname}</a></div>
            <div className='bg-amber-50 w-50 border rounded-lg p-2 text-center'>Date: {Data.date.split("T")[0]}</div>
            </div>))}</div>))
            }</div></div>
    </div>
  )
}
