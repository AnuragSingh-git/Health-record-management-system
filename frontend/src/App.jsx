import React from 'react'
import Register from './components/register.jsx'
import Login from './components/Login.jsx'
import { RequestPage } from './components/RequestPage.jsx'
import { DoctorDashboard } from './components/DoctorDashboard.jsx'
import { PatientDashboard } from './components/PatientDashboard.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Recordpatient } from './components/recordpatient.jsx'
import { Home } from './components/Home.jsx'

const App = () => {
  return (
    <div className='h-screen items-center justify-center bg-[url("https://images.unsplash.com/photo-1641160923894-b1a80920187d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/> 
          <Route path='/register' element={<Register/>}/> 
          <Route path='/DoctorDashboard' element={<DoctorDashboard/>}/> 
          <Route path='/request/:id' element={<RequestPage/>}/>
          <Route path='/patientDashboard' element={<PatientDashboard/>}/>
          <Route path='/recordpatient' element={<Recordpatient/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
