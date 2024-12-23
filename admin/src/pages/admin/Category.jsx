import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';

const Category = ({ token }) => {
  const [listCategory, setListCategory] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response_category = await axios.get(backendUrl + '/api/category/list');

      if (response_category.data.success) {
        setListCategory(response_category.data.categories);
      } 
      if (!response_category.data.success){
        toast.error(response_category.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const remove = async (id) => {
    try {
      const response = await axios.post(backendUrl + `/api/category/delete/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Categories List</p>
      <div className='flex flex-col gap-2'>
        {/* -------------- List Table Title -------------- */}
        <div className='hidden md:grid grid-cols-[2fr_2fr_3fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Name</b>
          <b>Category Type</b>
          <b>Description</b>
          <b className='text-center'>Action</b>
        </div>

        {/* -------------- Category List ---------------- */}
        {
          listCategory.map((item, index) => (
            <div 
              className='grid grid-cols-[2fr_2fr_3fr_2fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <p>{item.name}</p>
              <p>{item.type}</p>
              <p>{item.description}</p>
              <div className='flex justify-center items-center space-x-2'>
                <p 
                  onClick={() => remove(item.category_id)} 
                  className='cursor-pointer text-lg text-red-500'
                >
                  X
                </p>
                <button
                  onClick={() => navigate(`/Category_manage/Edit/${item.category_id}`)}
                  className='text-center bg-blue-500 text-white px-3 py-1 rounded-md text-xs'
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/Admin/Category_manage/ListProduct/${item.name}`)}
                  className='text-center bg-blue-500 text-white px-3 py-1 rounded-md text-xs'
                >
                  View
                </button>
              </div>
            </div>
          ))
        }
        
      </div>
    </>
  );
};

export default Category