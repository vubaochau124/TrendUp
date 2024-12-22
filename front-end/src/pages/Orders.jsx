import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
    const { token, currency,backendUrl } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!token) {
                    console.log('Token not found');
                    return;
                }

                const response = await axios.get(backendUrl + '/api/order/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrderData(response.data.orders);
            } catch (error) {
                console.log(error);
            }
        };

        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {orderData.map((order, index) => (
                    <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        {order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className='flex items-start gap-6 text-sm'>
                                {item.image && item.image[0] ? (
                                    <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                                ) : (
                                    <div className='w-16 sm:w-20 bg-gray-200'></div>
                                )}
                                <div>
                                    <p className='sm:text-base font-medium'>{item.name}</p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-lg'>{currency}{item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Size: {item.size}</p>
                                    </div>
                                    <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                                    <p className='text-sm md:text-base'>Payment Method: {order.paymentMethod}</p>
                                </div>
                            </div>
                        ))}
                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className='text-sm md:text-base'>{order.status}</p>
                            </div>
                            <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;