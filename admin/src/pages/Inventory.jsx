import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  const fetchAllInventory = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.sucess){
        const list_product = response.data.list_products
        let detail = []
        for (const p of list_product) {
          const product_id = p.product_id
          const responseSelect = await axios.post(backendUrl + '/api/inventory/select', {product_id})
          const selectInventory = responseSelect.data.message
          detail.push({"name": p.name, "detail": selectInventory})
        }
        console.log(detail)
        setInventory(detail)
      } else {
        toast.error(response.data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchAllInventory();
    },[])
  return (
    <>
      <p className='mb-2'>All Inventory List</p>
      <div className='flex flex-col gap-2'>
        {/* -------------- List Table Title -------------- */}
        <div className='hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Product</b>
          <b>Size S</b>
          <b>Size M</b>
          <b>Size L</b>
          <b>Size XL</b>
          <b>Size XXL</b>
          <b>Total</b>
        </div>

        {/* -------------- Category List ---------------- */}
        {
          inventory.map((item, index) => (
            <div 
              className='grid grid-cols-[2.3fr_1fr_1fr_1fr_1fr_1fr_1.5fr] items-center gap-2 py-1 px-2 border text-sm' 
              key={index}
            >
              <b>{item.name}</b>
              <b>{item.detail.S}</b>
              <b>{item.detail.S}</b>
              <b>{item.detail.S}</b>
              <b>{item.detail.S}</b>
              <b>{item.detail.S}</b>
              <b>{item.detail.S}</b>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Inventory 
