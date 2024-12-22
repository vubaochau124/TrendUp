import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
const Navbar = ({setToken}) => {
  const navigate = useNavigate(); // Hook điều hướng

  const handleLogout = () => {
    // Xóa token trong localStorage và state
    localStorage.removeItem('token');
    setToken(''); // Reset token state nếu bạn dùng useState
    navigate('/'); // Điều hướng về trang chủ
  };

  return (
    <div className='flex items-center py-2 px[4%] justify-between'>
        <img className= 'w-[max(7%,10px)]' src={assets.logo} alt=''/>
    <button
      onClick={handleLogout}
      className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
    >
      Logout
    </button>
    </div>
  );
}

export default Navbar
