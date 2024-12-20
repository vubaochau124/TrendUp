import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const ShopContext = React.createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = React.useState('');
    const [showSearch, setShowSearch] = React.useState(true);
    const [cartItems, setCartItems] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [token, setToken] = React.useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {
        if (!size) {
            toast.error('Please select a size');
            return;
        }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post('http://localhost:4000' + '/api/cart/add', {itemId, size}, {headers:{token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

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
    }

    const getCartAmount = async => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find(product => product.id === items);
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
            const response = await axios.get('http://localhost:4000' + '/api/product/list');
            if(response.data.success) {
                setProducts(response.data.products);
                console.log(response.data.products);
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
        if (!token && !localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
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