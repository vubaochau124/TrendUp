import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
//import {backendUrl} from '../App.js'
import { backendUrl } from '../../App';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const Employee_edit = () => {
  const { employee_id } = useParams();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(backendUrl + `/api/employee/fetch/${employee_id}`, { employee_id })
        
        const employeeData = response.data.message;
        // console.log(employeeData)
        console.log(response.data);
        if (employeeData !== undefined) {
          setName(employeeData.name);
          setDob(employeeData.dob.split('T')[0]);
          setPhone(employeeData.phone);
          setEmail(employeeData.email);
          setPassword(employeeData.password);
          setPosition(employeeData.position);
        }

      } catch (error) {
        console.error("Can't load employee:", error);
      }
    };

    if (employee_id) {
      fetchEmployee();
    }
  }, [employee_id]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + `/api/employee/edit/${employee_id}`, {
          employee_id,
          name,
          dob,
          phone,
          email,
          password,
          position
      });
      if (response.data.success){
        toast.success(response.data.message)
        navigate(-1);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error("Lỗi khi sửa danh mục:", error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      {/* Tên danh mục */}
      <div className='w-full'>
        <p className='mb-2'>Name</p>
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="text"  
          required 
        />
      </div>

      {/* Mô tả danh mục */}
      <div className='w-full'>
        <p className='mb-2'>Date of birth</p>
        <input 
          onChange={(e) => setDob(e.target.value)} 
          value={dob} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="date" 
          required 
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Phone</p>
        <input 
          onChange={(e) => setPhone(e.target.value)} 
          value={phone} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="phone" 
          required 
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Email</p>
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="email" 
          required 
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Password</p>
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="password" 
          required 
        />
      </div>

      {/* Chọn loại danh mục */}
      <div>
        <p className='mb-2'>Position</p>
        <select 
          onChange={(e) => setPosition(e.target.value)} 
          value={position} 
          className='w-full px-3 py-2'
        >
          <option value="admin">Admin</option>
          <option value="sale">Sale</option>
          <option value="shipper">Shipper</option>
          <option value="warehouse_staff">Warehouse staff</option>
        </select>
      </div>

      {/* Nút cập nhật */}
      <button 
        type="submit" 
        className='w-28 py-3 mt-4 bg-teal-500 text-white'
      >
        UPDATE
      </button>
    </form>
  )
}

export default Employee_edit
