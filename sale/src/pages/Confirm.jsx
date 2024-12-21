import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import { assets } from '../assets/assets';

const Confirm = ({token}) => {

  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [countProducts, setCountProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  
  const fetchAllOrders = async () => {
    try {
      const status = "Pending"
      const response = await axios.post(backendUrl + '/api/order/condition', {status})
      const response_orderDetail = await axios.post(backendUrl + '/api/order/detailcondition', {status})
      if (response.data.success && response_orderDetail.data.success){
        setOrders(response.data.message)
        setOrderDetails(response_orderDetail.data.message)
        let countP = {}
        for (const o of orders){
          countP[o.order_id] = []
        }
        for (const od of orderDetails){
          countP[od.order_id] ++
        }
        console.log(countP)
        setCountProducts(countP)
      } else {
        toast.error(response.data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  }

  const fetchProductDetails = async () => {
    const details = {};
    const response = await axios.get(backendUrl + "/api/product/list")
    const list_product = response.data.list_products
    for (const p of list_product) {
      details[p.product_id] = p;
    }
    setProducts(details);
    console.log(details)
  }

  const fetchCustomerDetails = async () => {
    const details = {};
    const response = await axios.get(backendUrl + "/api/customer/list")
    const list_customer = response.data.message
    for (const p of list_customer) {
      details[p.customer_id] = p;
    }
    setCustomers(details);
    console.log(details)
  }

  const fetchTotalPrice = async () => {
    try{
      const response = await axios.get(backendUrl + "/api/order/totalprice")
      if (response.data.success == true){
        setTotalPrice(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  }

  const update = async (id) => {
    try{
      const status = "Confirmed"
      const response = await axios.post(backendUrl + "/api/order/status", {status, id})
      console.log(response)
      if (response.data.success == true){
        setTotalPrice(response.data.message)
        fetchAllOrders();
        fetchProductDetails();
        fetchCustomerDetails();
        fetchTotalPrice();
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch(error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchAllOrders();
    fetchProductDetails();
    fetchCustomerDetails();
    fetchTotalPrice();
  },[token])

  return (
    <div>
      <h3>Confirmation Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1.2fr_0.7fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
            <div>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <p className='mt-5 mb-2 font-medium text-center w-12'>{order.order_id}</p>
            </div>
            
            <div>
            <div>
              {orderDetails.map((item, index) => {
                if (item.order_id === order.order_id) {
                  const product = products[item.product_id]
                  
                  return (
                    <p className='py-0.5' key={item.product_id}> {/* Dùng product_id hoặc giá trị duy nhất khác */}
                      {product.name} x {item.quantity} <span>{item.size}</span>
                    </p>
                  );
                }
                return null; // Đảm bảo có giá trị trả về nếu điều kiện không thỏa mãn
              })}
            </div>
            <p className='mt-3 mb-2 font-medium'>{customers[order.customer_id].name}</p>
            <div>
              <p>{order.delivery_address}</p>
            </div>
            <p>{order.phone}</p>
          </div>
          <div>
            <p className='text-sm sm:text-[15px]'>Items : {countProducts[order.order_id]}</p>
            <p className='mt-3'>Method : {order.payment_method}</p>
            <p>Payment : {order.payment_status}</p>
            <p>Date : {order.purchase_date.split("T")[0]}</p>
          </div>
          <p className='text-sm sm:text-[15px]'>{currency}{totalPrice[order.order_id]}</p>
          <button 
          onClick={() => update(order.order_id)} 
          className='font-semibold text-center bg-blue-500 text-white px-3 py-2 rounded-md text-xs'>
            Confirm
          </button>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Confirm
