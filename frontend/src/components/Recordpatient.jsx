import {useState, useEffect} from 'react'
import api from '../services/api'

export const Recordpatient = () => {
    const [user, setuser] = useState("")
    const [records, setrecords] = useState([])
    const [addrecordbutton, setaddrecordbutton] = useState(false)
    const [file, setFile] = useState(null);
    const [recordname, setRecordname] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
    const fetchRecords = async () => {
        try {
            const response = await api.post('/api/records/view')
            setrecords(response.data.record)
            console.log(response.data.record)
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    };

    fetchRecords();
    }, []);

    useEffect(() => {
        const fetchuser=async ()=>{
            const user=await api.get("/api/auth/getuser")
            setuser(user.data.user.name)
        }
        fetchuser()
      }
    , [])
    

    const addhandle=()=>{
        setaddrecordbutton(prev=>!prev)
    }

    const formsubmit=async (e)=>{
        try{
            e.preventDefault()
            const formData = new FormData();

        formData.append("file", file);
        formData.append("recordname", recordname);
        formData.append("date", date);

        const response=await api.post("api/records/upload",formData)
        setaddrecordbutton(false)
        console.log(response.data)
        }catch(error){
            console.log(error.response?.data||error.message)
        }
    }
    const Deletehandle=async (e)=>{
        try{
            const response=await api.delete(`api/records/Delete/${e._id}`)
            console.log(response.data)
        }catch(error){
            console.log(error.response?.data||error.message)
        }
    }
    
  return (
    <div>
    <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center bg-blue-400">
        <div className='bg-amber-50 h-[90%] w-[90%] rounded-lg shadow-2xl'>
            <div className='bg-gray-400 flex h-12 border m-4 rounded-lg justify-center items-center gap-4'><div className='bg-amber-50 border w-[67%] h-fit rounded-lg p-2 text-center uppercase'>{user||"Loading"}</div><div className='bg-amber-50 border w-[27%] h-fit rounded-lg p-2 text-center uppercase'>Age:{records[0]?.user?.age}</div></div>
            <div className='flex justify-center'><button onClick={addhandle} className='bg-red-400 hover:scale-105 flex h-12 w-40 border mx-4 rounded-lg justify-center items-center gap-4'>Add Reacord</button></div>
            {addrecordbutton && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white w-120 p-6 rounded-xl shadow-lg flex flex-col gap-4">
      
            <h2 className="text-xl font-bold text-center">Add Record</h2>

            <form onSubmit={formsubmit} className="flex flex-col gap-3">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded-lg" />

            <input
            type="text"
            placeholder="Record name"
            onChange={(e) => setRecordname(e.target.value)}
            className="border p-2 rounded-lg"
            />

            <input
            type="date"
            className="border p-2 rounded-lg"
            onChange={(e) => setDate(e.target.value)}
            />

           <div className="flex gap-2 mt-2">
           <button
           type="submit"
           className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
           >Save</button>

            <button
            type="button"
            onClick={() => setaddrecordbutton(false)}
            className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600">
            Cancel</button>
            </div>

            </form>
            </div>
            </div>
            )}
            <div className='border m-4 rounded-lg shadow-2xl'>
            {records.length==0 ? (<div className="text-gray-700 flex m-4 font-semibold justify-center">No requests found</div>)
            :(records.map((record,index)=>(
            <div key={index} className='bg-amber-200 flex justify-center px-4 py-2 items-center gap-4 border rounded-lg m-4'>
                <div className='bg-amber-50 border flex-1 rounded-lg p-2 text-center uppercase'><a href={record.url} target="_blank" className='w-full block justify-center'>{record.recordname}</a></div>
                <div className='bg-amber-50 border rounded-lg w-fit p-2 text-center'>Date:</div>
                <button onClick={()=>{Deletehandle(record)}} className='bg-red-400 hover:scale-105 border rounded-lg p-2 text-center uppercase'>Delete</button></div>
            )))
        }</div>
        </div>
    </div>
    </div>
  )
}
