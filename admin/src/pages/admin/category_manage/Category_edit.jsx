import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
//import {backendUrl} from '../App.js'
import { backendUrl } from '../../App';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Category_edit = ( ) => {
  const { category_id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Loại danh mục chính (Wearer hoặc Style)
  const [type, setType] = useState("Category");
  const navigate = useNavigate();
  
  // Tải dữ liệu danh mục khi component được render
  useEffect(() => {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(backendUrl + `/api/category/fetch/${category_id}`, { category_id })
          
          const categoryData = response.data.message;
          // console.log(categoryData)
          console.log(response.data);
          if (categoryData !== undefined) {
            setName(categoryData.name);
            setDescription(categoryData.description)
            setType(categoryData.type)
          }
  
        } catch (error) {
          console.error("Can't load category:", error);
        }
      };
  
      if (category_id) {
        fetchCategory();
      }
  }, [category_id]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu PUT đến backend để cập nhật
      const response = await axios.post(backendUrl + `/api/category/edit/${category_id}`, {
        category_id,
        name,
        description,
        type
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
          onChange={(e) => setType(e.target.value)} 
          value={type} 
          className='w-full px-3 py-2'
        >
          <option value="Category">Category</option>
          <option value="Style category">Style Category</option>
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