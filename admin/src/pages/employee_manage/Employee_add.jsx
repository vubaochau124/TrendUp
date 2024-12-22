import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Employee_add = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("sale");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(backendUrl + "/api/employee/add",{
          name,
          dob,
          phone,
          email,
          password,
          position
        }, {
          headers: { token: localStorage.getItem('token') },
        });
        if (response.data.success){
          toast.success(response.data.message)
          navigate(-1);
        } else {
          toast.error(response.data.message)
        }
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3' autocomplete="off">

      {/* Tên danh mục */}
      <div className='w-full'>
        <p className='mb-2'>Name</p>
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="text"  
          required 
          placeholder="Type there"
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
          placeholder="Type there"
        />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Email</p>
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          className='w-full max-w-[500px] px-3 py-2' 
          autocomplete="off"
          name="no-autofill"
          type="email" 
          required 
          
          placeholder="Type there"
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
          autocomplete="off"
          name="no-autofill"
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
          {/* <option value="admin">Admin</option> */}
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

export default Employee_add
