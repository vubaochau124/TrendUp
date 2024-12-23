import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const Revenue = ({token}) => {
    const [orders, setOrders] = useState([]);

    const timeFormat = (time) => { 
        return new Date(time).toLocaleString('en-GB');
    }

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/order/orders");
            if (response.data.success) {
                const ord = [];
                response.data.orders.forEach(order => {
                    if (order.status === "Completed") {
                        ord.push(order);
                    }
                });
                console.log("orders: ", response.data.orders);
                console.log("ord: ", ord);
                setOrders(ord);
            } else {
                console.log("error: ", response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <>
            <div className='flex flex-col gap-2'>
                <p className='mb-2'>Revenue</p>

                <p className="mb-2">Total revenue: {
                    orders.reduce((acc, order) => acc + order.amount, 0).toFixed(2)
                    }</p>

                <div className='grid grid-cols-[0.5fr_0.75fr_1.75fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Order ID</b>
                    <b>Customer ID</b>
                    <b>Order Date</b>
                    <b>Order Total</b>
                    <b>Payment Method</b>
                </div>
            </div>

            {
                orders.map((order, index) => (
                    <div
                        className="grid grid-cols-[0.5fr_0.75fr_1.75fr_1fr_1fr] items-center py-1 px-2 border text-sm"
                        key={order.id}
                    >
                        <p>{order.id}</p>
                        <p>{order.userId}</p>
                        <p>{timeFormat(order.createdAt)}</p>
                        {/* <p>{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p> */}
                        <p>{order.amount}</p>
                        <p>{order.paymentMethod}</p>
                    </div>
                ))
            }
        </>
    );
}

export default Revenue;