import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const Category = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/category/list');
      if (response.data.success) {
        setList(response.data.categories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeCategory = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/category/remove', { id }, { headers: { token } });
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
        <div className='hidden md:grid grid-cols-[3fr_2fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Name</b>
          <b>Category Type</b>
          <b>Description</b>
          <b className='text-center'>Action</b>
        </div>

        {/* -------------- Category List ---------------- */}
        {
          list.map((item, index) => (
            <div 
              className='grid grid-cols-[3fr_2fr_3fr_1fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <p>{item.name}</p>
              <p>{item.type}</p>
              <p>{item.description}</p>
              <div className='flex justify-center items-center space-x-2'>
                <p 
                  onClick={() => removeCategory(item._id)} 
                  className='cursor-pointer text-lg text-red-500'
                >
                  X
                </p>
                <button
                  onClick={() => navigate(`/category_edit/${item._id}`)}
                  className='text-center bg-blue-500 text-white px-3 py-1 rounded-md text-xs'
                >
                  Edit
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