import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../../App";
import { assets } from "../../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/order/orders");
      if (response.data.success) {
        console.log("orders: ", response.data.orders);
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setOrderStatus = async (id, order_status) => {
    const status = order_status;
    const orderId = id;
    console.log("status: ", status);
    console.log("orderId: ", orderId);
    try {
      const response = await axios.post(backendUrl + "/api/order/status", {
        orderId,
        status,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_0.75fr_0.25fr] lg:grid-cols-[0.5fr_2fr_1.2fr_0.7fr_0.75fr_0.25fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={order.id}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                <p>Address: {order.address.street + ", " + order.address.district + ", " + order.address.city}</p>
              </div>
              <p>Phone: {order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              {/* <p>Payment : {order.payment}</p> */}
              {/* <p>Date : {order.purchase_date.split("T")[0]}</p> */}
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select onChange={(e) => setOrderStatus(order.id, e.target.value)} value={order.status} className="p-2 font-semibold">
              <option value="Order Placed">Order Placed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipping">Shipping</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={() => navigate(`/Order_detail/${order.id}`)}
              className="text-lg p-1 rounded-md ml-8 w-4 h-full"
            > {'>'} </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
