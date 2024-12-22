import React, { useState, useContext } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaypalCheckoutButton = (props) => {
    const { product } = props;
    const { cartItems, products, token, setCartItems, getCartAmount } = useContext(ShopContext);
    const navigate = useNavigate();

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = async (orderID) => {
        setPaidFor(true);

        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product.id === parseInt(items)));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            let orderData = {
                address: product.address,
                items: orderItems,
                amount: getCartAmount() + product.delivery_fee,
                paymentMethod: 'Paypal',
                paymentDetails: { orderID }
            };

            const response = await fetch(backendUrl + '/api/order/paypal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                setCartItems({});
                navigate('/orders');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
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
        <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
                onClick={(data, actions) => {
                    const hasAlreadyBoughtCourse = false;
                    if (hasAlreadyBoughtCourse) {
                        setError("You already bought this course");
                        return actions.reject();
                    } else {
                        return actions.resolve();
                    }
                }}
                // createOrder={(data, actions) => {
                //     return actions.order.create({
                //         purchase_units: [
                //             {
                //                 description: product.description,
                //                 amount: {
                //                     value: product.price,
                //                 },
                //             },
                //         ],
                //     });
                // }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("order", order);

                    handleApprove(data.orderID);
                }}
                onCancel={() => {}}
                onError={(err) => {
                    setError(err);
                    console.log("PayPal Checkout onError", err);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PaypalCheckoutButton;