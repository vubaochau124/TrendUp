import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'

const Cart = () => {
    const {product, currency, cartItems } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {

      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
    },[cartItems])
  return (
    <div>

    </div>
  )
}

export default Cart