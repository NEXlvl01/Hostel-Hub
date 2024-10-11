import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from 'axios';
import toast from "react-hot-toast";

export default function WardenComplaints() {

  const [user, setUser] = useState({});
  const [complaints,setComplaints] = useState([]);

  async function getUser() {
    const token = Cookies.get("token");
    if (!token) {
      return;
    }
    const response = await axios.get("https://hostel-hub-bl3q.onrender.com/user/getUser");
    setUser(response.data.user);
  }

  async function getData() {
    const response = await axios.get("https://hostel-hub-bl3q.onrender.com/complaints/getByHostel");
    setComplaints(response.data.allComplaints);
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
