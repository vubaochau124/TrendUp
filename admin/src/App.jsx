import React, { useEffect, useState, Suspense } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

import ShipperOrder from './pages/shipper/Order'
import Delivery from './pages/shipper/Delivery'
import Shipping from './pages/shipper/Shipping'
import ShipperComplete from './pages/shipper/Complete'

import Employee from './pages/admin/Employee.jsx'
import Customer from './pages/admin/Customer'
import AdminOrder from './pages/admin/Order.jsx'
import Product from './pages/admin/Product'
import Product_add from './pages/admin/Product_add'
import Product_edit from './pages/admin/Product_edit'
import Category from './pages/admin/Category'
import Category_add from './pages/admin/Category_add'
import Category_edit from './pages/admin/Category_edit'
import Category_product from './pages/admin/Category_product.jsx'
import AdminInventory from './pages/admin/Inventory'
import Import_manage from './pages/admin/Import_manage'
import Employee_edit from './pages/admin/Employee_edit.jsx'
import Employee_add from './pages/admin/Employee_add.jsx'


import SaleOrder from './pages/sale/Order';
import Confirm from './pages/sale/Confirm';
import Status from './pages/sale/Status';
import SaleComplete from './pages/sale/Complete';

import WarehouseInventory from './pages/warehouse/inventory/Inventory'
import Inventory_edit from './pages/warehouse/inventory/Inventory_edit.jsx'
import Import from './pages/warehouse/import/Import'
import Export from './pages/warehouse/Export'
import Export_complete from './pages/warehouse/Export_complete'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

export const currency ='$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    console.log(role, token)
    localStorage.removeItem('previousPage');
  }, [token]);


  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" && role === ""? (
        <Login setToken={setToken} setRole={setRole} />
      ) : (
        <>
        <Navbar setToken={setToken} setRole={setRole}/>
        <hr />
          <div className="flex w-full">
          <Sidebar role={role} />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <Routes>
                  {
                      (() => {
                        if (role === "admin") {
                          return (
                            <>
                <Route path='/' element={<Employee token={token}/>} />
                <Route path='/Employee_manage/List' element={<Employee token={token}/>} />
                <Route path='/Employee_manage/Add' element={<Employee_add token={token}/>} />
                <Route path='/Employee_manage/Edit/:employee_id' element={<Employee_edit token={token}/>} />
                <Route path='/Customer' element={<Customer token={token}/>} />
                <Route path='/Order_manage' element={<AdminOrder token={token}/>} />
                
                <Route path='/Product_manage/List' element={<Product token={token}/>} />
                <Route path='/Product_manage/Add' element={<Product_add token={token}/>} />
                <Route path='/Product_manage/Edit/:product_id' element={<Product_edit token={token}/>} />
                <Route path='/Category_manage/List' element={<Category token={token}/>} />
                <Route path='/Category_manage/Add' element={<Category_add token={token}/>} />
                <Route path='/Category_manage/Edit/:category_id' element={<Category_edit token={token}/>} />
                <Route path='/Category_manage/ListProduct/:category_name' element={<Category_product token={token}/>} />
                <Route path='/Inventory' element={<AdminInventory token={token}/>} />
                <Route path='/Import_manage' element={<Import_manage token={token}/>} />
                              
                            </>
                          );
                        } else if (role === "sale") {
                          return (
                            <>
                <Route path='/' element={<SaleOrder token={token}/>} />
                <Route path='/Confirm' element={<Confirm token={token}/>} />
                <Route path='/Status' element={<Status token={token}/>} />
                <Route path='/Complete' element={<SaleComplete token={token}/>} />
                            </>
                          );
                        } else if (role === "shipper") {
                          return (
                            <>
                <Route path='/' element={<ShipperOrder token={token}/>} />
                <Route path='/Delivery' element={<Delivery token={token}/>} />
                <Route path='/Shipping' element={<Shipping token={token}/>} />
                <Route path='/Complete' element={<ShipperComplete token={token}/>} />
                            </>
                          );
                        }
                        else if (role === "warehouse_staff") {
                          return (
                            <>
                              <Route path='/' element={<WarehouseInventory token={token}/>} />
                              <Route path='/Inventory' element={<WarehouseInventory token={token}/>} />
                              <Route path='/Inventory/Edit/:product_id' element={<Inventory_edit token={token}/>} />
                              <Route path='/Import/List' element={<Import token={token}/>} />
                              <Route path='/Export/Export' element={<Export token={token}/>} />
                              <Route path='/Export/Complete' element={<Export_complete token={token}/>} />
                              
                            </>
                          );
                        } else{
                          localStorage.removeItem('token');
                          localStorage.removeItem('role');
                          setToken('');
                          setRole('');
                        }
                      })()
                    }
                </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;