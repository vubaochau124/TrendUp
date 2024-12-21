import userModel from "../models/userModel.js"

// add to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        console.log(userId);
        const userData = await userModel.findOne({ where: { id: userId } });
        let cartData = userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.update({ cartData }, { where: { id: userId } });

        res.json({ success: true, message: "Item added to cart" });

        //console.log(cartData);
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// update cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findOne({ where: { id: userId } });
        let cartData = userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.update({ cartData }, { where: { id: userId } });

        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// get user cart
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;

        const userData = await userModel.findOne({where: {id: userId}});
        let cartData = await userData.cartData;

        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
    }
}

export { addToCart, updateCart, getUserCart }