import orderModel from "../models/ordersModel.js";
import productModel from "../models/productsModel.js";
import userModel from "../models/userModel.js";
import { Op } from 'sequelize';


// placeOrder function
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        // Create a new order
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

        // Reduce the quantity of the ordered sizes in the product inventory
        for (const item of items) {
            const product = await productModel.findByPk(item.id);
            if (product) {
                const sizes_changed = product.sizes.map(size => {
                    if (size.size === item.size) {
                        size.quantity -= item.quantity;
                    }
                    return size;
                });
                await productModel.update({ sizes: sizes_changed }, { where: { id: item.id } });
                const updatedProduct = await productModel.findByPk(item.id);
                console.log('Product after update:', updatedProduct.sizes); // Add logging
            }
        }

        await userModel.update({ cartData : {}}, { where: { id: userId } });

        res.json({ success: true, message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// placeOrder using Paypal function
const placeOrderPaypal = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        console.log('Order Data is:', req.body);
        const userId = req.userId;

        // Create a new order
        const newOrder = await orderModel.create({
            userId,
            items,
            amount,
            address,
            status: 'Order Placed',
            paymentMethod: 'Paypal',
            payment: false,
            date: new Date()
        });

        // Return the order ID
        res.json({ success: true, message: 'Order placed successfully', orderId: newOrder.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const payedPaypal = async (req, res) => {
    try {
        const { orderId, items } = req.body;
        const userId = req.userId;
        console.log('User ID:', userId)

        // Log orderId to verify its structure
        console.log('Received orderId:', orderId);

        // Validate the received data
        const [updated] = await orderModel.update({ payment: true }, { where: { id: orderId } });
        if (updated === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        for (const item of items) {
            const product = await productModel.findByPk(item.id);
            if (product) {
                const sizes_changed = product.sizes.map(size => {
                    if (size.size === item.size) {
                        size.quantity -= item.quantity;
                    }
                    return size;
                });
                await productModel.update({ sizes: sizes_changed }, { where: { id: item.id } });
                const updatedProduct = await productModel.findByPk(item.id);
                console.log('Product after update:', updatedProduct.sizes); // Add logging
            }
        }

        await userModel.update({ cartData : {}}, { where: { id: userId } });

        // Respond with success
        res.json({ success: true, message: 'Order payment updated successfully'});
    } catch (error) {
        console.error('Error in payedPaypal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const userOrders = async (req, res) => {
    try {
        const userId = req.userId; // Get userId from the request object
        
        const orders = await orderModel.findAll({ where: { userId } });
        
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

////////////////////////////
//////////ADMIN/////////////
////////////////////////////

// fetch all orders from the database

////////////////////////////
//////////ADMIN/////////////
////////////////////////////

// fetch all orders from the database
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.findAll();
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const updateOrderStatus = async (req, res) => { 
    try {
        const { orderId, status } = req.body;
        const order = await orderModel.findByPk(orderId);
        if (order) {
            await order.update({ status });
            res.json({ success: true, message: `Order ${orderId} status updated to ${status}` });
        } else {
            res.status(404).json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findByPk(orderId);
        if (order) {
            res.json({ success: true, order });
        } else {
            res.status(404).json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getOrderByStatus = async (req, res) => {
    try {
        const status = req.params.status
        const statusArray = status.split(";")
        console.log(status.split(";"))
        const orders = await orderModel.findAll({
            where: {
                status: { // Chỉ định cột "status"
                    [Op.in]: statusArray, // Áp dụng toán tử [Op.in] cho cột "status"
                },
            },
        });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const getOrdersByPayment = async (req, res) => {
    try {
        const orders = await orderModel.findAll({ where: { status: "Completed" } });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


export { placeOrder, placeOrderPaypal, getAllOrders, userOrders, updateOrderStatus, getOrderById,  getOrderByStatus, getOrdersByPayment, payedPaypal}