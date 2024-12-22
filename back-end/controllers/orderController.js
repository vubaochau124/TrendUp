import orderModel from "../models/ordersModel.js";
import productModel from "../models/productsModel.js";
import userModel from "../models/userModel.js";


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

}

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

export { placeOrder, placeOrderPaypal, getAllOrders, userOrders, updateOrderStatus, getOrderById }