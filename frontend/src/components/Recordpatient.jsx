import {useState, useEffect} from 'react'
import api from '../services/api'

export const Recordpatient = () => {
    const [records, setrecords] = useState([{name:"hello",url:"abcdef"}])

    useEffect(() => {
    const fetchRecords = async () => {
        try {
            const response = await api.post('/api/records/view');
            setrecords(response.data.record);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    fetchRecords();
    }, []);
    
  return (
    <div>
    <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center bg-blue-400">
        <div className='bg-amber-50 h-[90%] w-[90%] rounded-lg shadow-2xl'>
            <div className='bg-gray-400 flex h-12 border m-4 rounded-lg justify-center items-center gap-4'><div className='bg-amber-50 border w-[67%] h-fit rounded-lg p-2 text-center uppercase'>Name</div><div className='bg-amber-50 border w-[27%] h-fit rounded-lg p-2 text-center uppercase'>Age</div></div>
            <div className='border m-4 rounded-lg shadow-2xl'>
        {records.map((record,index)=>(
            <div className='bg-amber-200 flex justify-center items-center gap-4 h-12 border rounded-lg m-4'>
                <div className='bg-amber-50 border w-[80%] h-fit rounded-lg p-2 text-center uppercase'>url</div>
                <div className='bg-amber-50 border w-[13%] h-fit rounded-lg p-2 text-center uppercase'>Delete</div></div>
            ))
        }</div>
        </div>
    </div>
    </div>
  )
}
