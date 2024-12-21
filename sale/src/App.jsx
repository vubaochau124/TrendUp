import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Order from './pages/Order';
import Confirm from './pages/Confirm';
import Status from './pages/Status';
import Complete from './pages/Complete';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

export const currency ='$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === ""
        ? <Login setToken={setToken}/>
        : <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/' element={<Order token={token}/>} />
                <Route path='/Confirm' element={<Confirm token={token}/>} />
                <Route path='/Status' element={<Status token={token}/>} />
                <Route path='/Complete' element={<Complete token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
