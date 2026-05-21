import React from 'react'
import Register from './components/register.jsx'
import Login from './components/Login.jsx'

const App = () => {
  return (
    <div className='h-screen items-center justify-center bg-[url("https://images.unsplash.com/photo-1641160923894-b1a80920187d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
      <Register/>
      <Login/>
    </div>
  )
}
export default App
