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
import Category from './pages/category_manage/Category'
import Inventory from './pages/Inventory'
import Import_manage from './pages/import_manage/Import_manage'
import Export_manage from './pages/export_manage/Export_manage'

const App = () => {

  const [token, setToken] = useState('');

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
                <Route path='/Trang chủ' element={<Home />} />
                <Route path='/Quản lý nhân viên' element={<Employee />} />
                <Route path='/Quản lý khách hàng' element={<Customer />} />
                <Route path='/Quản lý đơn hàng' element={<Order />} />
                <Route path='/Quản lý sản phẩm' element={<Product />} />
                <Route path='/Quản lý danh mục' element={<Category />} />
                <Route path='/Quản lý tồn kho' element={<Inventory />} />
                <Route path='/Quản lý nhập kho' element={<Import_manage />} />
                <Route path='/Quản lý xuất kho' element={<Export_manage />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
