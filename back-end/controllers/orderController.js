import orderModel from "../models/ordersModel.js";
import userModel from "../models/userModel.js";


// placeOrder function
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const newOrder = await orderModel.create({
            userId,
            items,
            amount,
            address,
            status: 'Order Placed',
            paymentMethod: 'COD',
            payment: false,
            date: new Date()
        });

        res.json({ success: true, message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// placeOrder using Paypal function
const placeOrderPaypal = async (req, res) => {

}

const allOrders = async (req, res) => {

}

const userOrders = async (req, res) => {
    try {
        
        const {userId} = req.body;
        const orders = await orderModel.findAll({ where: { userId } });
        res.json({success: true, orders});

    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const updateStatus = async (req, res) => { 

}

export { placeOrder, placeOrderPaypal, allOrders, userOrders, updateStatus }