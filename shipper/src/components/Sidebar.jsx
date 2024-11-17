import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-1 pt-1 pl-[5%] pr-[5%] text-[15px]'>
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Order">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Tất cả đơn hàng </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/PickUp">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Đơn hàng cần lấy </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Delivery">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Đơn hàng đang giao </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Complete">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Đơn hàng đã giao </p>
        </NavLink>
        <hr />
      </div>
    </div>
  )
}

export default Sidebar
