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

const Sidebar = ({role}) => {
  const location = useLocation();

  // Cấu trúc menu data
  let menuItems = [
    // {
    //   title: 'Home',
    //   route: '/Home'
    // },
    {
      title: 'Revenue',
      route: '/Revenue',
    },
    {
      title: 'Employee Management',
      route: '/Employee_manage',
      submenu: [
        { title: 'Employee list', route: 'List' },
        { title: 'Add Employee ', route: 'Add' },
        //{ title: 'Edit product', route: 'Edit' }
      ]
    },
    {
      title: 'Order Management',
      route: '/Order_manage',
    },
    {
      title: 'Product Management',
      route: '/Product_manage',
      submenu: [
        { title: 'Product list', route: 'List' },
        { title: 'Add product', route: 'Add' },
        //{ title: 'Edit product', route: 'Edit' }
      ]
    },
    {
      title: 'Category Management',
      route: '/Category_manage',
      submenu: [
        { title: 'Category list', route: 'List' },
        { title: 'Add category', route: 'Add' },
        // { title: 'Edit category', route: 'Edit' }
      ]
    },
    {
      title: 'Inventory Management',
      route: '/Inventory'
    },
    {
      title: 'Import Management',
      route: '/Import_manage',
    },
  ]
    if (role === "sale") {
      menuItems = [
        // {
        //   title: 'Home',
        //   route: '/Home'
        // },
        {
          title: 'All Order',
          route: '/'
        },
        {
          title: 'Confirmation Order',
          route: '/Confirm',
        },
        {
          title: 'Status Order',
          route: '/Status'
        },
        {
          title: 'Completion Order',
          route: '/Complete',
        },
      ]}
  if (role === "shipper") {
    menuItems =  [
      // {
      //   title: 'Home',
      //   route: '/Home'
      // },
      {
        title: 'All Order',
        route: '/'
      },
      {
        title: 'Delivery Order',
        route: '/Delivery',
      },
      {
        title: 'Shipping Order',
        route: '/Shipping'
      },
      {
        title: 'Completion Order',
        route: '/Complete',
      },
    ]} 
  if (role === "warehouse_staff"){
    menuItems =  [
      // {
      //   title: 'Home',
      //   route: '/Home'
      // },
      {
        title: 'Inventory',
        route: '/Inventory',
      },
      {
        title: 'Import Order',
        route: '/Import',
        submenu: [
          { title: 'Import Order', route: 'List' },
          { title: 'Add Import', route: 'Add' },
          //{ title: 'Edit product', route: 'Edit' }
        ]
      },
      {
        title: 'Export Order',
        route: '/Export',
        submenu: [
          { title: 'Export Order', route: 'Export' },
          { title: 'Completetion Order', route: 'Complete' },
          //{ title: 'Edit product', route: 'Edit' }
        ]
      },
    ]
  }
  console.log(role)
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