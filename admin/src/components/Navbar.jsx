import React from "react";
import { assets } from "../assets/assets.js";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const { doctorToken, setDoctorToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const logout = () => {
    adminToken && setAdminToken('')
    adminToken && localStorage.removeItem('adminToken')
    doctorToken && setDoctorToken('')
    doctorToken && localStorage.removeItem('doctorToken')
    navigate('/')
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            className="w-12 h-10 rounded-md border border-1 border-blue-700"
            src={assets.logo}
            alt="Logo"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-medium text-blue-700">CareBridge</h1>
            <h1 className="text-sm font-medium text-gray-500">Dashboard Panel</h1>
          </div>
        </div>
        <p className="border px-2.5 py-0.5 rounded-full border-gray-600">{adminToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={ logout } className="bg-primary text-white text-sm px-10 py-2 rounded-full">Logout</button>
    </div>
  );
};

export default Navbar;
