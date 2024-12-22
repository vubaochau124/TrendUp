import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Employee from './pages/employee_manage/Employee.jsx'
import Customer from './pages/Customer'
import Order from './pages/order_manage/Order.jsx'
import Product from './pages/product_manage/Product'
import Product_add from './pages/product_manage/Product_add'
import Product_edit from './pages/product_manage/Product_edit'
import Category from './pages/category_manage/Category'
import Category_add from './pages/category_manage/Category_add'
import Category_edit from './pages/category_manage/Category_edit'
import Category_product from './pages/category_manage/Category_product.jsx'
import Inventory from './pages/Inventory'
import Import_manage from './pages/import_manage/Import_manage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Employee_edit from './pages/employee_manage/Employee_edit.jsx'
import Employee_add from './pages/employee_manage/Employee_add.jsx'
import Order_detail from './pages/order_manage/Order_detail.jsx'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

export const currency ='$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  const [product_id, setProduct_id] = useState('')

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
                <Route path='/' element={<Employee token={token}/>} />
                
                <Route path='/Employee_manage/List' element={<Employee token={token}/>} />
                <Route path='/Employee_manage/Add' element={<Employee_add token={token}/>} />
                <Route path='/Employee_manage/Edit/:employee_id' element={<Employee_edit token={token}/>} />
                
                <Route path='/Customer' element={<Customer token={token}/>} />

                <Route path='/Order_manage' element={<Order token={token}/>} />
                <Route path='/Order_detail/:id' element={<Order_detail token={token}/>} />

                <Route path='/Product_manage/List' element={<Product token={token}/>} />
                <Route path='/Product_manage/Add' element={<Product_add token={token}/>} />
                <Route path='/Product_manage/Edit/:product_id' element={<Product_edit token={token}/>} />

                <Route path='/Category_manage/List' element={<Category token={token}/>} />
                <Route path='/Category_manage/Add' element={<Category_add token={token}/>} />
                <Route path='/Category_manage/Edit/:id' element={<Category_edit token={token}/>} />
                <Route path='/Category_manage/ListProduct/:id' element={<Category_product token={token}/>} />

                <Route path='/Inventory' element={<Inventory token={token}/>} />

                <Route path='/Import_manage' element={<Import_manage token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
