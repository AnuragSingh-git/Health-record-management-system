import React, { useEffect , useState} from 'react'
import api from '../services/api'

export const PatientDashboard = () => {
    const [User, setUser] = useState({})
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

  return (
    <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center bg-blue-400">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center uppercase">HELLO {User.name}</h1>
        <p className="text-gray-600">Welcome to your dashboard!</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg justify-center items-center flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">Your Health Records</h2>
        <p className="text-gray-600">You can view and manage your health records here.</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">View Records</button>
        <div className="mt-4 text-gray-600">You can also manage your permissions for doctors to access your records.</div>
        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg">Manage Permissions</button>
      </div>
    </div>
  )
}
