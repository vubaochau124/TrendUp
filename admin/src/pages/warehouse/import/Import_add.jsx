import React, { useEffect, useState } from 'react';
import { assets } from '../../../assets/assets'
import axios from 'axios'
import { backendUrl } from '../../../App';
import { toast } from 'react-toastify';

const ImportAdd = () => {
  const [file1, setFile1] = useState(false)

  const [date, setDate] = useState();
  const [amount, setAmount] = useState(25);

  useEffect(() => {
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("date", date);
      formData.append("amount", amount);

      if (file1) formData.append("file1", file1);

      console.log(file1);  // Kiểm tra xem file đã được chọn hay chưa
          const response = await axios.post(backendUrl + "/api/import/add", formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',  // Đảm bảo gửi đúng loại nội dung
              },
          });
      console.log(response.data);  // Kiểm tra kết quả
      
      if (response.data.success){
        toast.success("Import Order Added")
        setDate('')
        setAmount(25)
        setFile1(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload File</p>

        <div className='flex gap-2'>
          <label htmlFor="file1">
            <img className='w-20' src={!file1 ? assets.upload_area : URL.createObjectURL(file1)} alt="file1" />
            <input onChange={(e) => setFile1(e.target.files[0])} type="file" id="file1" hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Date Import</p>
        <input 
          onChange={(e) => setDate(e.target.value)} 
          value={date} 
          className='w-full max-w-[250px] px-3 py-2' 
          type="date" 
          required 
        />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Import Amount</p>
          <input onChange={(e) => setAmount(e.target.value)} className='w-full px-3 py-2 sm:w-[250px]' type="Number" placeholder='25' defaultValue={amount}/>
        </div>

      </div>



      <button type="submit" className='w-28 py-3 mt-4 bg-teal-500 text-white'>ADD</button>
    </form>
  )
}

export default ImportAdd
