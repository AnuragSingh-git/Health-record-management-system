import React from 'react'

function register() {
    const handlesummit=(e)=>{
        e.preventDefault()
    }
  return (
    <div className='flex flex-row bg-[url("https://images.unsplash.com/photo-1641160923894-b1a80920187d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] h-full w-full rounded-xl items-center justify-center'>
    <form className='flex flex-col h-1/2 w-1/2 rounded-xl items-center justify-center border bg-amber-50 gap-4' onSubmit={handlesummit}>
        <input className='border h-10 w-60 rounded-lg text-center' type='text' placeholder='email'/>
        <input className='border h-10 w-60 rounded-lg text-center' type='password' placeholder='password'/>
        <button className='bg-blue-400 h-8 w-27 rounded-xl' type='submit'>Register</button>
    </form></div>
  )
}

export default register