import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from 'axios';
import toast from "react-hot-toast";

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

export default function WardenComplaints() {

  const [user, setUser] = useState({});
  const [complaints, setComplaints] = useState([]);

  async function getUser() {
    try {
      const response = await axios.get('/user/getUser');
      setUser(response.data.user);
    } catch (error) {
      console.log("Error ", error);
    }
  }

  async function getData() {
    try {
      const response = await axios.get('/complaints/getByHostel');
      setComplaints(response.data.allComplaints);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    getUser();
  }, []);


  return (
    <div>

    </div>
  )
}
