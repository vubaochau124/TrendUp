import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[15%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-1 pt-1 pl-[5%] pr-[5%] text-[15px]'>
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Inventory">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Kho hàng </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/import/Import">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Nhập hàng </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Export">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Đơn hàng cần xuất </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Export_complete">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Đơn hàng đã xuất </p>
        </NavLink>
        <hr />
      </div>
    </div>
  )
}

export default Sidebar
