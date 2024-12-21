import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';

const Category = ({ token }) => {
  const [listStyle, setListStyle] = useState([]);
  const [listWearer, setListWear] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response_style = await axios.get(backendUrl + '/api/categories/liststyle');
      const response_wearer = await axios.get(backendUrl + '/api/categories/listwearer');

      if (response_style.data.sucess) {
        setListStyle(response_style.data.list_styles);
      } 
      if (response_wearer.data.sucess) {
        setListWear(response_wearer.data.list_wearer);
      }
      if (!response_style.data.sucess && !response_wearer.data.sucess){
        toast.error(response_wearer.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeStyle = async (name) => {
    try {
      const response = await axios.post(backendUrl + '/api/categories/removestyle', { name }, { headers: { token } });
      if (response.data.sucess) {
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
  const removeWearer = async (name) => {
    try {
      const response = await axios.post(backendUrl + '/api/categories/removewearer', { name }, { headers: { token } });
      if (response.data.sucess) {
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
          listStyle.map((item, index) => (
            <div 
              className='grid grid-cols-[2fr_2fr_3fr_2fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <p>{item.name}</p>
              <p>{'Style'}</p>
              <p>{item.description}</p>
              <div className='flex justify-center items-center space-x-2'>
                <p 
                  onClick={() => removeStyle(item.name)} 
                  className='cursor-pointer text-lg text-red-500'
                >
                  X
                </p>
                <button
                  onClick={() => navigate(`/Category_manage/Edit/${item.name}`)}
                  className='text-center bg-blue-500 text-white px-3 py-1 rounded-md text-xs'
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/Category_manage/ListProduct/${item.name}`)}
                  className='text-center bg-blue-500 text-white px-3 py-1 rounded-md text-xs'
                >
                  View
                </button>
              </div>
            </div>
          ))
        }
        {
          listWearer.map((item, index) => (
            <div 
              className='grid grid-cols-[2fr_2fr_3fr_2fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <p>{item.name}</p>
              <p>{'Wearer'}</p>
              <p>{item.description}</p>
              <div className='flex justify-center items-center space-x-2'>
                <p 
                  onClick={() => removeWearer(item.name)} 
                  className='cursor-pointer text-lg text-red-500'
                >
                  X
                </p>
                <button
                  onClick={() => navigate(`/Category_manage/Edit/${item.name}`)}
                  className='text-center bg-blue-500 text-white px-3 py-1 rounded-md text-xs'
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/Category_manage/ListProduct/${item.name}`)}
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