import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Inventory from './pages/inventory/Inventory'
import Import from './pages/import/Import'
import Inventory_edit from './pages/inventory/Inventory_edit'
import Export from './pages/Export'
import Export_complete from './pages/Export_complete'

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
                <Route path='/' element={<Inventory token={token}/>} />
                <Route path='/Inventory' element={<Inventory token={token}/>} />
                <Route path='/Inventory/Edit:product_id/product_name:product_name' element={<Inventory_edit token={token}/>} />
                <Route path='/Import/List' element={<Import token={token}/>} />
                <Route path='/Export/Export' element={<Export token={token}/>} />
                <Route path='/Export/Complete' element={<Export_complete token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
