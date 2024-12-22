import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../App';

const Order_detail = () => {
  const orderId = useParams().id;
  const [order, setOrder] = useState({});
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/order/${orderId}`);
      if (response.data.success) {
        // set order
        setOrder(response.data.order);
        // set items
        setItems(response.data.order['items']);
        // calculate total cost
        setTotal(response.data.order['items'].reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2));
        console.log("success: ", response.data.success);
        console.log('order: ', order);
        console.log('items: ', items);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const timeFormat = (time) => { 
    return new Date(time).toLocaleString('en-GB');
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <h1>Order Detail</h1>
      <div className='flex flex-col gap-2 mt-4'>
        {/* -------------- List Table Title -------------- */}
        <div className='hidden md:grid grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Size</b>
          <b>Quantity</b>
          <b>Price</b>
          <b>Total</b>
        </div>

        { order && order['items'] &&
          order['items'].map((item, index) => (
            <div className='grid grid-cols-[1fr_1fr_1fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border text-sm' key={item.id}>
              <img className='w-12' src={item.image[0]} alt='img' />
              <p>{item.name}</p>
              <p>{item.size}</p>
              <p>{item.quantity}</p>
              <p>{item.price}</p>
              <p>{(item.quantity * item.price).toFixed(2)}</p>
            </div>
          ))
        }
      </div>
      
      <div className='flex-col justify-start mt-4'>
        {/* total */}
        <p className='text-lg font-bold'>Total: {total}</p>
        {/* Payment status */}
        <p className='text-lg font-bold'>Payment status: {order.status}</p>
        {/* Create at */}
        <p className='text-lg font-bold'>Create at: {timeFormat(order.createdAt)}</p>
        {/* Last update */}
        <p className='text-lg font-bold'>Last update: {timeFormat(order.updatedAt)}</p>
      </div>
    </>
  )
}

export default Order_detail
