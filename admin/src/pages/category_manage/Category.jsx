import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';

const Category = ({ token }) => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const res_category = await axios.get(backendUrl + '/api/category/list');

      console.log(res_category.data);

      if (res_category.data.success) {
        setCategory(res_category.data.categories);
      } 
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeStyle = async (id) => {
    try {
      const response = await axios.post(backendUrl + `/api/category/remove/${id}`, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchCategory();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <p className='mb-2'>All Categories List</p>
      <div className='flex flex-col gap-2'>
        {/* -------------- List Table Title -------------- */}
        <div className='hidden md:grid grid-cols-[2fr_4fr_3fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Name</b>
          <b>Description</b>
          <b className='text-center'>Action</b>
        </div>

        {/* -------------- Category List ---------------- */}
        {
          category.map((cat, index) => (
            <div 
              className='grid grid-cols-[2fr_4fr_3fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <p>{cat.name}</p>
              <p>{cat.description}</p>
              <div className='flex justify-center items-center space-x-2'>
                <p 
                  onClick={() => removeStyle(cat.id)} 
                  className='cursor-pointer text-lg text-red-500'
                >
                  X
                </p>
                <button
                  onClick={() => navigate(`/Category_manage/Edit/${cat.id}`)}
                  className='text-center bg-blue-500 text-white px-3 py-1 rounded-md text-xs'
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/Category_manage/ListProduct/${cat.id}`)}
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