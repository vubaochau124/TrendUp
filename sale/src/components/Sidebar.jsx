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
            <p className='md:block'>{item.title}</p>
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
        <p className='md:block'>{item.title}</p>
      </NavLink>
      <hr />
    </>
  )
}

const Sidebar = () => {
  const location = useLocation();

  // Cấu trúc menu data
  const menuItems = [
    // {
    //   title: 'Home',
    //   route: '/Home'
    // },
    {
      title: 'All Order',
      route: '/'
    },
    {
      title: 'Order Confirmation',
      route: '/Confirm',
    },
    {
      title: 'Order Status',
      route: '/Status'
    },
    {
      title: 'Order Completion',
      route: '/Complete',
    },
  ];

  // Kiểm tra xem có đang ở route của submenu nào không
  const isSubRoute = menuItems
    .filter(item => item.submenu)
    .some(item => location.pathname.includes(item.route));

  return (
    <div className='w-[20%] min-h-screen border-r-2'>
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