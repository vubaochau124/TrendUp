import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';


const Employee = () => {
  const [listEmployee, setListEmployee] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/employee/list');
      if (response.data.success) { 
        setListEmployee(response.data.employees);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const remove = async (id) => {
    try {
      const response = await axios.post(backendUrl + `/api/employee/delete/${id}`);
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
      <p className='mb-2'>All Employees List</p>
      <div className='flex flex-col gap-2'>
        {/* -------------- List Table Title -------------- */}
        <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Name</b>
          <b>Date of birth</b>
          <b>Phone</b>
          <b>Email</b>
          <b>Position</b>
          <b className='text-center'>Action</b>
        </div>

        {
          listEmployee.map((item, index) => (
            <div 
              className='grid grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <b>{item.name}</b>
              <b>{item.dob.split('T')[0]}</b>
              <b>{item.phone}</b>
              <b>{item.email}</b>
              <b>{item.position}</b>
              <div className='flex justify-center items-center space-x-2'>
                <p 
                  onClick={() => remove(item.employee_id)} 
                  className='cursor-pointer text-lg text-red-500'
                >
                  X
                </p>
                <button
                  onClick={() => navigate(`Admin/Employee_manage/Edit/${item.employee_id}`)}
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

export default Employee
