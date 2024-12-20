import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
//import {backendUrl} from '../App.js'
import { backendUrl } from '../../App';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const Category_edit = ( ) => {
  const { name } = useParams();
  const [nameProduct, setNameProduct] = useState(name);
  const [description, setDescription] = useState("");
  
  // Loại danh mục chính (Wearer hoặc Style)
  const [categoryType, setCategoryType] = useState("Wearer");

  // Tải dữ liệu danh mục khi component được render
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        // Gọi API để lấy thông tin chi tiết của danh mục
        const response_style = await axios.post(backendUrl + "/api/categories/singlestyle", { name })
        const response_wearer = await axios.post(backendUrl + "/api/categories/singlewearer", { name })

        const styleData = response_style.data.style;
        const wearerData = response_wearer.data.wearer;
        console.log(styleData)
        if (styleData.length !== 0) {
          setNameProduct(name)
          setDescription(styleData[0].description);
          setCategoryType('Style');
        }
        if (wearerData.length !== 0) {
          setNameProduct(name)
          setDescription(wearerData[0].description);
          setCategoryType('Wearer');
        }

      } catch (error) {
        console.error("Lỗi khi tải chi tiết danh mục:", error);
      }
    };

    if (name) {
      fetchCategoryDetails();
    }
  }, [name]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu PUT đến backend để cập nhật
      if (categoryType === 'Wearer'){
        const response = await axios.post(backendUrl + "/api/categories/editwearer", {
          name,
          nameProduct,
          description
        });
        if (response.data.success){
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } 
      if (categoryType === 'Style'){
        const response = await axios.post(backendUrl + "/api/categories/editstyle", {
          name,
          nameProduct,
          description
        });
        if (response.data.sucess){
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
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
          onChange={(e) => setNameProduct(e.target.value)} 
          value={nameProduct} 
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