import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'

// Component MenuItem để xử lý submenu
const MenuItem = ({ item, isSubRoute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Đóng submenu nếu không ở trong route của nó
    if (!location.pathname.includes(item.route)) {
      setIsOpen(false);
    }
  }, [location.pathname, item.route]);

  const toggleSubmenu = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Nếu item có submenu
  if (item.submenu) {
    return (
      <>
        <div>
          <button
            onClick={toggleSubmenu}
            className="menu-btn"
          >
            <p className='hidden md:block'>{item.title}</p>
            <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
            {item.submenu.map((subItem, index) => (
              <NavLink
                key={index}
                to={`${item.route}/${subItem.route}`}
                className={({ isActive }) =>
                  `submenu-item ${isActive ? 'active' : ''}`
                }
              >
                {subItem.title}
              </NavLink>
            ))}
          </div>
        </div>
        <hr />
      </>
    )
  }

  // Nếu là menu bình thường
  return (
    <>
      <NavLink
        className={({ isActive }) => `sidebar-item ${isActive && !isSubRoute ? 'active' : ''}`}
        to={item.route}
      >
        <p className='hidden md:block'>{item.title}</p>
      </NavLink>
      <hr />
    </>
  )
}

const Sidebar = () => {
  const location = useLocation();

  // Cấu trúc menu data
  const menuItems = [
    {
      title: 'Home',
      route: '/Home'
    },
    {
      title: 'Employee Management',
      route: '/Employee'
    },
    {
      title: 'Customer Management',
      route: '/Customer'
    },
    {
      title: 'Order Management',
      route: '/order_manage',
    },
    {
      title: 'Product Management',
      route: '/product_manage',
      submenu: [
        { title: 'Add product', route: 'add' },
        { title: 'View product list', route: 'list' }
      ]
    },
    {
      title: 'Category Management',
      route: '/category_manage',
      submenu: [
        { title: 'Add category', route: 'add' },
        { title: 'Edit category', route: 'edit' },
        { title: 'Category list', route: 'list' }
      ]
    },
    {
      title: 'Inventory Management',
      route: '/Inventory'
    },
    {
      title: 'Import Management',
      route: '/import_manage',
    },
    {
      title: 'Export Management',
      route: '/export_manage',
    }
  ];

  // Kiểm tra xem có đang ở route của submenu nào không
  const isSubRoute = menuItems
    .filter(item => item.submenu)
    .some(item => location.pathname.includes(item.route));

  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-1 pt-1 pl-[5%] pr-[5%] text-[15px]'>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            isSubRoute={isSubRoute}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar