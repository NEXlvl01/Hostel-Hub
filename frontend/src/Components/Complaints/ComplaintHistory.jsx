import axios from 'axios';
import React, { useEffect, useState } from 'react';

axios.defaults.baseURL = 'https://hostel-hub-bl3q.onrender.com';

// Set the Authorization header with the Bearer token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // If the response status is 401, handle it appropriately
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export default function ComplaintHistory({ setShowForm }) {

  const [complaints,setComplaints] = useState([]);

  async function getComplaints() {
    try {
      const response = await axios.get('/complaints/getByUser');
      setComplaints(response.data.allComplaints);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComplaints();
  },[]);

  return (
    <div className="flex flex-col gap-7 py-2">
      <div className="text-[#343330] flex items-center justify-between">
        <p className="font-semibold text-xl">Complaint History</p>
        <button
          className="text-white bg-[#DC851F] py-2 px-4 rounded-lg hover:bg-[#eea756] transition-all duration-200"
          onClick={() => { setShowForm(true); }}
        >
          Raise Complaint
        </button>
      </div>

      <div className='h-[51vh] overflow-y-scroll'>

        {
          complaints.map((complaint) => (
            <div className='rounded-lg border-2 border-black p-4 mt-3 py-4 flex justify-between'>
              <div className='flex flex-col gap-3'>
                <div className='flex gap-2 text-xl'>
                  <p className='text-[#DC851F] font-semibold'>Complaint Type - </p>
                  <p className='text-[#343330] font-semibold'>{complaint.complaintType}</p>
                </div>
                <div className='flex gap-2'>
                  <p className='font-semibold text-[#DC851F]'>Complaint Details - </p>
                  <p className='w-[300px] text-wrap text-[#343330] font-semibold'>{complaint.complaintDetails}</p>
                </div>
              </div>

              <div>
                <p className='text-[#DC851F] font-semibold text-xl'>Status</p>
                <div className={`font-semibold text-xl ${complaint.status === "Pending" ? "text-blue-500" : "text-green-500"}`}>{complaint.status}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
