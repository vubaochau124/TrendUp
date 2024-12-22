import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Context from './pages/Context'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID }}>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/context' element={<Context />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='cart' element={<Cart />} />
          <Route path='place-order' element={<PlaceOrder />} />
          <Route path='orders' element={<Orders />} />
          <Route path='login' element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </PayPalScriptProvider>
  )
}

export default App