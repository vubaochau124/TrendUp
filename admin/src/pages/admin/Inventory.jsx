import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  const fetchAllInventory = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success){
        const list_product = response.data.products
        let detail = []
        for (const p of list_product) {
          let total = 0
          for (const s of p.sizes) {
            total += parseFloat(s.quantity)
          }
          p["total"] = total
          detail.push(p)
        }
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
    <div>
      <h3>Inventory Page</h3>
      <div>
        {inventory.map((product, index) => (
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_1.5fr_1.5fr_0.7fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
            <div>
              <img className='w-12' src={product.image[0]} alt="" />
            </div>
            <div>
              <p className='text-sm sm:text-[18px] font-medium'>{product.name}</p>
            </div>
            <div>
              {product.sizes.map((item, index) => (
                      <p className='mb-2'>Size {item.size} : {item.quantity}</p>
                    ))
              }
            </div>
          <p className='text-sm sm:text-[15px]'>{product.total} items</p>
          
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default Inventory 
