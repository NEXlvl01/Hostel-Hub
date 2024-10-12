import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig.js';

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
