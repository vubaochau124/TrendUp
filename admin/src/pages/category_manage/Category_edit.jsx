import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
//import {backendUrl} from '../App.js'

const Category_edit = ({ categoryId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  // Loại danh mục chính (Wearer hoặc Style)
  const [categoryType, setCategoryType] = useState("Wearer");

  // Tải dữ liệu danh mục khi component được render
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        // Gọi API để lấy thông tin chi tiết của danh mục
        const response = await axios.get(`${backendUrl}/api/category/${categoryId}`);
        const categoryData = response.data;

        // Điền dữ liệu vào state
        setName(categoryData.name);
        setDescription(categoryData.description);
        setCategoryType(categoryData.categoryType);

      } catch (error) {
        console.error("Lỗi khi tải chi tiết danh mục:", error);
      }
    };

    if (categoryId) {
      fetchCategoryDetails();
    }
  }, [categoryId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu PUT đến backend để cập nhật
      const response = await axios.put(`${backendUrl}/api/category/edit/${categoryId}`, {
        name,
        description,
        categoryType
      });
      console.log(response.data);

    } catch (error) {
      console.error("Lỗi khi sửa danh mục:", error);
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

export default Category_edit;