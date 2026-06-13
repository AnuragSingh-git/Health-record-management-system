import React, { useEffect , useState} from 'react'
import api from '../services/api'

export const PatientDashboard = () => {
    const [User, setUser] = useState({})
    const [gotrequests, setgotrequests] = useState([])
    const [permission, setpermission] = useState(false)
    const [showRequests, setShowRequests] = useState(false);
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
        setShowRequests(prev => !prev);
      } catch (error) {
        setShowRequests(prev => !prev);
        console.error('Error fetching permission requests:', error.response?.data || error.message);
      }
    };

    const givepermissionhandle=async (doctorid)=>{
        try{
            await api.post('/api/request/permission',{
              doctorid
            })
        }catch(err){
            console.log(err.response?.data || err.message)
        }
    }

    const revokepermissionhandle=async (doctorid)=>{
        try{
            await api.post('/api/request/revokepermission',{
                doctorid
            })
        }catch(err){
            console.log(err.response?.data || err.message)
        }
    }

    const deletepermissionhandle=async (doctorid)=>{
        try{
            const response = await api.delete('/api/request/deletepermission',{
                data: { doctorid }
            })
            console.log(response.data.message)
            setgotrequests(prev =>
            prev.filter(req => req.doctorid._id !== doctorid)
            );
        }catch(err){
            console.log(err.response?.data || err.message)
        }
    }


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
        {showRequests && (gotrequests.length === 0 ? (
        <div className="text-gray-700 mt-4 font-semibold">
          No permission requests found
        </div>
      ) :
        (gotrequests.map((requests,index)=>(
          <div key={index} className='bg-gray-100 rounded-lg p-2 mt-2 w-full'>
            <div className='text-gray-800 font-semibold'>Doctor Name: {requests.doctorid.name}</div>
            <div className='text-gray-600'>Status: {requests.status}</div>
            {requests.status === 'pending' && (
              <button onClick={() => givepermissionhandle(requests.doctorid._id)} className='mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:scale-105 active:scale-90'>Allow</button>
            )}
            {requests.status === 'approved' && (
              <button onClick={() => revokepermissionhandle(requests.doctorid._id)} className='mt-2 bg-green-500 text-white px-4 py-1 rounded-lg hover:scale-105 active:scale-90'>Deny</button>
            )}
            {requests.status === 'rejected' && (
              <div className='flex flex-col gap-2'><button onClick={() => givepermissionhandle(requests.doctorid._id)} className='mt-2 bg-yellow-500 text-white px-4 py-1 rounded-lg hover:scale-105 active:scale-90'>Allow</button>
              <button onClick={() => deletepermissionhandle(requests.doctorid._id)} className='mt-2 bg-red-500 text-white px-4 py-1 rounded-lg hover:scale-105 active:scale-90'>Delete</button>
              </div>
            )}
          </div>
        ))))}</div>
        </div>
      </div>
    </div>
  )
}
