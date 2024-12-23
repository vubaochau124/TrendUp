import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const ShopContext = React.createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 0.99;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = React.useState('');
    const [showSearch, setShowSearch] = React.useState(true);
    const [cartItems, setCartItems] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [token, setToken] = React.useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        console.log('addToCart called with:', { itemId, size });

        if (!size) {
            toast.error('Please select a size');
            return;
        }

        if (!itemId) {
            toast.error('Invalid item ID');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId, size },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.error('User not authenticated');
        }
    };

    const getCartCount = () => {
        let totalCoount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCoount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCoount;
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);
        
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, size, quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.error('User not authenticated');
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.get(
                backendUrl + '/api/cart/get',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const getCartAmount = async => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find(product => product.id === parseInt(items));
            for(const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if(response.data.success) {
                setProducts(response.data.products);
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred. Please try again.');
        }
    }

    useEffect(() => {
        getProductsData();
    } ,[])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;