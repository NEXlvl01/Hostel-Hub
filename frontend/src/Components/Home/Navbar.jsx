import React, { useContext, useEffect, useState } from "react";
import logo from "../../Images/logos/hostel-hub-logo-2.png";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Navbar.css";

// Set the base URL for API requests
axios.defaults.baseURL = 'https://hostel-hub-bl3q.onrender.com';

// Set the Authorization header with the Bearer token
axios.interceptors.push({
  request: (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  response: (response) => {
    if (response.status === 401) {
      // Token has expired, prompt user to log in again
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return response;
  },
});

export default function Navbar() {

  const [user, setUser] = useState({});

  async function getUser() {
    try {
      const response = await axios.get('/user/getUser ');
      setUser(response.data.user);
    } catch (error) {
      console.log("Error ", error);
    }
  }

  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.log("Error ", error);
    }
  }, []);

  return (
    <div className="flex justify-around h-[12vh] items-center min-h-[100px]">
      <div>
        <img src={logo} alt="" className="w-[300px] h-[65px] cursor-pointer" />
      </div>

      <div className="flex gap-10 justify-center items-center text-[#343330]">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <button className="font-semibold cursor-pointer hover:text-[#DC851F] transition-all duration-300">
            Home
          </button>
        </NavLink>
        <NavLink to="/gatepass" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <button className="font-semibold cursor-pointer hover:text-[#DC851F] transition-all duration-300">
            Gatepass
          </button>
        </NavLink>
        <NavLink to="/complaints" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <button className="font-semibold cursor-pointer hover:text-[#DC851F] transition-all duration-300">
            Complaints
          </button>
        </NavLink>
        <NavLink to="/profile">
          <div>
            <button class="relative inline-block group">
              <span class="relative z-10 block px-4 py-3 overflow-hidden font-semibold leading-tight text-[#343330] transition-colors duration-300 ease-out border-2 border-[#343330] rounded-lg group-hover:text-white">
                <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span class="absolute left-0 w-56 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#DC851F] group-hover:-rotate-180 ease"></span>
                <span class="relative flex gap-2 justify-center items-center">
                  <FaUser /> {user?.fullName}
                </span>
              </span>
              <span
                class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
