import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Thêm import useNavigate
import axios from 'axios'
import { backendUrl, currency } from '../../App'
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

const Category_product = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng

  const fetchproducts = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/categories/listproduct', {name});
      if (response.data.sucess) {
        setProducts(response.data.list_products);
        console.log(products)
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id });
      if (response.data.sucess) {
        toast.success(response.data.message);
        await fetchproducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchproducts();
  }, []);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* -------------- List Table Title -------------- */}
        <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Wearer</b>
          <b>Style</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* -------------- Product List ---------------- */}
        {
          products.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr_1fr_0.5fr_1.5fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.images && typeof item.images === 'string' ? item.images.split(';')[0] : null} alt="" />
              <p>{item.name}</p>
              <p>{item.person_type_name}</p>
              <p>{item.product_style_name}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item.product_id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
              {/* Nút bấm chuyển hướng */}
              <button
                onClick={() => navigate(`/Product_manage/Edit/${item.product_id}`)              } // Chuyển hướng với ID sản phẩm
                className='text-center bg-blue-500 text-white px-3 py-1 rounded-md'
              >
                Edit
              </button>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Category_product
