import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-1 pt-1 pl-[5%] pr-[5%] text-[15px]'>
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Home">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Trang chủ </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Employee">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Quản lý nhân viên </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/Customer">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Quản lý khách hàng </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/order_manage/Order">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Quản lý đơn hàng </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/product_manage/Product">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Quản lý sản phẩm </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/category_manage/Category">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Quản lý danh mục </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="Inventory">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Quản lý tồn kho </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/import_manage/Import">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Quản lý nhập kho </p>
        </NavLink>
        <hr />
        <NavLink className='flex items-center gap-3 px-3 py-2' to="/export_manage/Export">
            {/* <img className='w-5 h-5' src={assets.menu_icon}/> */}
            <p className='hidden md:block'>Quản lý xuất kho </p>
        </NavLink>
        <hr />
      </div>
    </div>
  )
}

export default Sidebar
