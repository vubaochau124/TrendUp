import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../../assets/assets';
//import {backendUrl} from '../App.js'
import { backendUrl } from '../../../App';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Inventory_edit = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState([]);
  const [name, setName] = useState([]);
  const [sizes, setSizes] = useState({});
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendUrl + `/api/product/${product_id}`)
        if (response.data.success) {
          console.log(response.data.product.sizes)
          setProduct(response.data.product.sizes);
          setName(response.data.product.name);
          // setProductSize(response.data.product.sizes)
          let list_size = {}
          const list_product = response.data.product.sizes
          for (const s of list_product) {
            list_size[s.size] = s.quantity
          }
          setSizes(list_size)
          console.log(list_size);
        } else {
          toast.error(response.data.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    if (product_id) {
      fetchProducts();
    }
  }, [product_id]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let formatSizes = []
      for (const s of product) {
        formatSizes.push({"size":s.size, "quantity": sizes[s.size]})
      } 
      console.log(formatSizes)
      const response = await axios.post(backendUrl + `/api/product/editinventory/${product_id}`, {
        formatSizes
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
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-5'>
      <h1>Edit Quantity For {name}</h1>
      {product.map((item, index) => (
      <div className='w-full flex gap-5'>
        <p className='mb-2'>Size {item.size}  </p>
        <input 
            onChange={(e) => setSizes((prev) => ({
              ...prev, // Giữ lại các kích thước hiện có
              [item.size]: parseInt(e.target.value), // Cập nhật hoặc thêm kích thước mới
          }))
            } 
            value={sizes[item.size]}
            className="w-full px-3 py-2 sm:w-[120px]" 
            type="number"  
            placeholder="25"
        />
      </div>
      
      ))}
      <button type="submit" className='w-28 py-3 mt-4 bg-teal-500 text-white'>UPDATE</button>
    </form>
  )
}

export default Inventory_edit
