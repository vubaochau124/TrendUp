import React, { useState, useContext } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const PaypalCheckoutButton = ({ orderData }) => {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const { backendUrl, token, setCartItems, navigate } = useContext(ShopContext);
    const [orderId, setOrderId] = useState(null);

    const amount = orderData.amount;
    const items = orderData.items;

    const createOrder = async (data, actions) => {
        try {
            console.log('orderData 1 before JSON.stringify:', orderData);
            // Call the /api/order/paypal endpoint to create an order
            const response = await fetch(`${backendUrl}/api/order/paypal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            console.log('orderData 1 after JSON.stringify:', JSON.stringify(orderData));

            if (response.ok) {
                const { orderId } = await response.json();
                console.log('orderId:', orderId);
                console.log(typeof orderId);
                setOrderId(orderId);
                localStorage.setItem('orderId', orderId); // Store orderId in localStorage
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: orderData.amount // Use the amount from orderData
                        }
                    }]
                });
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
                toast.error(errorData.message);
                return actions.reject();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return actions.reject();
        }
    };

    const handleApprove = async (data, actions) => {
        try {
            //const order = await actions.order.capture();
            setPaidFor(true);

            // Retrieve orderId from localStorage
            const orderId = localStorage.getItem('orderId');

            // Log orderId before sending
            console.log('orderId before sending:', orderId);

            // Call the /api/order/payed-paypal endpoint with the orderId
            const response = await axios.post(`${backendUrl}/api/order/payed-paypal`, 
                { orderId, items },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Log orderId after sending
            console.log('orderId after sending:', orderId);

            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    if (paidFor) {
        alert("Thank you for your purchase!");
    }

    if (error) {
        alert(error);
    }

    return (
        <PayPalScriptProvider>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={handleApprove}
            />
        </PayPalScriptProvider>
    );
};

export default PaypalCheckoutButton;