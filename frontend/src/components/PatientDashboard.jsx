import React, { useEffect , useState} from 'react'
import api from '../services/api'

export const PatientDashboard = () => {
    const [User, setUser] = useState({})
    const [gotrequests, setgotrequests] = useState([])
    const [permission, setpermission] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
        try{const userdata = await api.get('/api/auth/getuser')
        if(!userdata){
          return console.log("no user found")
        }
        setUser(userdata.data.user)
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error.message)
      }
    }

    fetchUser()
  }, [])

  const permissionhandle=async ()=>{
      try {
        const response = await api.get('/api/request/getrequests');
        setgotrequests(response.data.requestgot);
        console.log(response.data.requestgot);
      } catch (error) {
        console.error('Error fetching permission requests:', error.response?.data || error.message);
      }
    };


  return (
    <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center bg-blue-400">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center uppercase">{User.name}</h1>
        <p className="text-gray-600">Welcome to your dashboard!</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg justify-center items-center flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">Your Health Records</h2>
        <p className="text-gray-600">You can view and manage your health records here.</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 active:scale-90">View Records</button>
        <div className="mt-4 text-gray-600">You can also manage your permissions for doctors to access your records.</div>
        <button onClick={permissionhandle} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:scale-105 active:scale-90">Manage Permissions</button>
        <div className='flex flex-col items-center justify-center'><div className='bg-gray-200 w-fit rounded-xl px-4 py-2 mt-4'>Permission Requests</div>
        <div>
        {gotrequests.map((requests,index)=>(
          <div key={index} className='bg-gray-100 rounded-lg p-2 mt-2 w-full'>
            <div className='text-gray-800 font-semibold'>Doctor Name: {requests.doctorid.name}</div>
            <div className='text-gray-600'>Status: {requests.status}</div>
            {requests.status === 'pending' && (
              <button className='mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:scale-105 active:scale-90'></button>
            )}
          </div>
        ))}</div>
        </div>
      </div>
    </div>
  )
}
