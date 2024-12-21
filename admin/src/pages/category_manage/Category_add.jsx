import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';


const Category_add = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  // Loại danh mục chính (Wearer hoặc Style)
  const [categoryType, setCategoryType] = useState("Wearer");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu POST đến backend
      if (categoryType === "Wearer"){
        const response = await axios.post(backendUrl + "/api/categories/addwearer",{name, description});
        if (response.data.sucess){
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      }
      if (categoryType === "Style"){
        const response = await axios.post(backendUrl + "/api/categories/addstyle", {name, description});
        if (response.data.sucess){
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

      {/* Tên danh mục */}
      <div className='w-full'>
        <p className='mb-2'>Category name</p>
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          className='w-full max-w-[500px] px-3 py-2' 
          type="text" 
          placeholder='Type here' 
          required 
        />
      </div>

      {/* Mô tả danh mục */}
      <div className='w-full'>
        <p className='mb-2'>Category description</p>
        <textarea 
          onChange={(e) => setDescription(e.target.value)} 
          value={description} 
          className='w-full max-w-[500px] px-3 py-2' 
          placeholder='Write content here' 
          required 
        />
      </div>

      {/* Chọn loại danh mục */}
      <div>
        <p className='mb-2'>Category type</p>
        <select 
          onChange={(e) => setCategoryType(e.target.value)} 
          value={categoryType} 
          className='w-full px-3 py-2'
        >
          <option value="Wearer">Wearer Category</option>
          <option value="Style">Style Category</option>
        </select>
      </div>

      {/* Nút thêm */}
      <button 
        type="submit" 
        className='w-28 py-3 mt-4 bg-teal-500 text-white'
      >
        ADD
      </button>
    </form>
  )
}

export default Category_add;