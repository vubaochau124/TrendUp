import React, { useState } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Employee from './pages/Employee'
import Customer from './pages/Customer'
import Order from './pages/order_manage/Order'
import Product from './pages/product_manage/Product'
import Product_add from './pages/product_manage/Product_add'
import Product_edit from './pages/product_manage/Product_edit'
import Category from './pages/category_manage/Category'
import Category_add from './pages/category_manage/Category_add'
import Category_edit from './pages/category_manage/Category_edit'
import Inventory from './pages/Inventory'
import Import_manage from './pages/import_manage/Import_manage'
import Export_manage from './pages/export_manage/Export_manage'

const App = () => {

  const [token, setToken] = useState(' ');

  return (
    <div className='bg-gray-50 min-h-screen'>
      {token === ""
        ? <Login />
        : <>
          <Navbar />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/Home' element={<Home />} />
                <Route path='/Employee' element={<Employee />} />
                <Route path='/Customer' element={<Customer />} />
                <Route path='/Order_manage' element={<Order />} />
                <Route path='/Product_manage/List' element={<Product />} />
                <Route path='/Product_manage/Add' element={<Product_add />} />
                <Route path='/Product_manage/Edit' element={<Product_edit />} />
                <Route path='/Category_manage/List' element={<Category />} />
                <Route path='/Category_manage/Add' element={<Category_add />} />
                <Route path='/Category_manage/Edit' element={<Category_edit />} />
                <Route path='/Inventory' element={<Inventory />} />
                <Route path='/Import_manage' element={<Import_manage />} />
                <Route path='/Export_manage' element={<Export_manage />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
