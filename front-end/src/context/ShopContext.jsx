import React from 'react';
import { products } from '../assets/assets';

export const ShopContext = React.createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = React.useState('');
    const [showSearch, setShowSearch] = React.useState(true);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;