import React, { useEffect, useState, Suspense } from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

import routesConfig from '../routesconfig.jsx'


export const backendUrl = import.meta.env.VITE_BACKEND_URL

export const currency ='$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.removeItem('previousPage');
  }, [token]);

  const roleRoutes = routesConfig[role] || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} setRole={setRole} />
      ) : (
        <>
        <Navbar setToken={setToken}/>
        <hr />
          <div className="flex w-full">
          <Sidebar role={role} />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {roleRoutes.map(({ path, element }) => {
                    const Component = React.lazy(() => import(`./pages/${role}/${element}`));
                    return <Route key={path} path={path} element={<Component />} />;
                  })}
                </Routes>
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;