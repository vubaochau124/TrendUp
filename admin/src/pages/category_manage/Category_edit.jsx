import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
//import {backendUrl} from '../App.js'
import { backendUrl } from '../../App';
import { useFetcher, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const Category_edit = ( ) => {
  const { id } = useParams("id");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [subFormState, setSubFormState] = useState(false);
  const [subForm, setSubForm] = useState({
    name: "",
    description: ""
  });

  const fetchCategory = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/category/${id}`);
      console.log(response.data);
      if (response.data.success) {
        setName(response.data.category.name);
        setDescription(response.data.category.description);
        fetchSubCategoryList();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetch category:", error);
    }
  }

  const fetchSubCategoryList = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/category/sub/${id}`);
      console.log(response.data);
      if (response.data.success) {
        setSubCategoryList(response.data.subCategories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetch subcategory list:", error);
    }
  }

  const addSubCategory = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/category/subadd', { subForm, category_id: id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchSubCategoryList();
        setSubForm({ name: "", description: "" });
        setSubFormState(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error add subcategory:", error);
    }
  }

  const removeSubCategory = async (id) => {
    try {
      const response = await axios.post(backendUrl + `/api/category/subremove/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchSubCategoryList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error remove subcategory:", error);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + `/api/category/edit/${id}`, { name, description });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi sửa danh mục:", error);
    }
  }  
  
  // fix sau
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
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

      <div className='w-full'>
        <p className='mb-2'>Subcategory</p>
        <div className='flex flex-col gap-2'>
        
          {/* -------------- List Table Title -------------- */}
          <div className='hidden md:grid grid-cols-[3fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Name</b>
            <b>Description</b>
            <b className='text-center'>Action</b>
          </div>
  
          {/* -------------- Subcategory List ---------------- */}
          {
            subCategoryList.map((item, index) => (
              <div className='grid grid-cols-[3fr_3fr_0.5fr_0.5fr] md:grid-cols-[3fr_3fr_0.5fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p onClick={() => removeSubCategory(item.id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
                <button
                  onClick={() => navigate(`/Product_manage/Edit/${item.id}`)}
                  className='text-center px-3 py-1 rounded-md'
                >
                  Edit
                </button>
              </div>
            ))
          }
        </div>
      </div>
      
      <span className='flex gap-4'>
        <button
          className='w-28 py-3 mt-4 bg-teal-500 text-white'
          onClick={() => setSubFormState(!subFormState)}
        >
          ADD SUB
        </button>

        <button 
          type="submit" 
          className='w-28 py-3 mt-4 bg-teal-500 text-white'
        >
          UPDATE
        </button>
      </span>

      {subFormState && (
        <div className='flex flex-col w-full items-start gap-3'>
          <div className='w-full'>
            <p className='mb-2'>Subcategory name</p>
            <input 
              onChange={(e) => setSubForm({ ...subForm, name: e.target.value })} 
              value={subForm.name}
              className='w-full max-w-[500px] px-3 py-2' 
              type="text" 
              placeholder='Type here' 
              required 
            />
          </div>
    
          <div className='w-full'>
            <p className='mb-2'>Subcategory description</p>
            <textarea 
              onChange={(e) => setSubForm({ ...subForm, description: e.target.value })} 
              value={subForm.description} 
              className='w-full max-w-[500px] px-3 py-2' 
              placeholder='Write content here' 
              required 
            />
          </div>
    
          <button 
            type="submit" 
            className='w-28 py-3 mt-4 bg-teal-500 text-white'
            onClick={addSubCategory}
          >
            ADD
          </button>
        </div>
      )}
    </form>
  )
}

export default Category_edit;