import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';

const Import_manage = () => {
  const [listImport, setListImport] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/import/list');
      if (response.data.success) { 
        setListImport(response.data.employees);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>All Imports List</p>
      <div className='flex flex-col gap-2'>
        {/* -------------- List Table Title -------------- */}
        <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>ID</b>
          <b>Date</b>
          <b>Amount</b>
          <b>Receipt</b>
        </div>

        {
          listImport.map((item, index) => (
            <div 
              className='grid grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <b>{item.import_id}</b>
              <b>{item.date}</b>
              <b>{item.amount}</b>
              <b>{item.receipt}</b>
              <div className='flex justify-center items-center space-x-2'>
                <p 
                  onClick={() => remove(item.import_id)} 
                  className='cursor-pointer text-lg text-red-500'
                >
                  X
                </p>
                <button
                  onClick={() => navigate(`/Import_manage/Edit/${item.employee_id}`)}
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
}

export default Import_manage
