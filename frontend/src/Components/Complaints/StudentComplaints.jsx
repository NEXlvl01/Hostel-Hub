import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import RaiseComplaint from './RaiseComplaint';
import ComplaintHistory from './ComplaintHistory';

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


export default function StudentComplaints() {

    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(true);

    async function getUser() {
        try {
            const response = await axios.get('/user/getUser');
            setUser(response.data.user);
        } catch (error) {
            console.log("Error ", error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);



    return (
        <div className="bg-neutral-100 min-h-[88vh]">
            <div className="w-full flex justify-center items-center py-4 flex-col gap-3">
                <div className="w-[80%] rounded-2xl shadow-2xl border-2 bg-white py-3 px-4">
                    <div>
                        <p className="text-3xl text-[#DC851F]">
                            Hi,{" "}
                            <span className="text-[#343330] font-semibold">{user?.fullName}</span>
                        </p>
                        <p className="font-semibold">
                            <span className="text-[#DC851F]">Roll No - </span>
                            {user?.rollNo}
                        </p>
                        <p className="font-semibold">
                            <span className="text-[#DC851F]">Hostel - </span>
                            {user?.hostel} , {user?.room}
                        </p>
                    </div>
                </div>

                <div className='w-[80%] rounded-2xl shadow-2xl border-2 bg-white py-3 px-4'>
                    {
                        showForm ? (<RaiseComplaint setShowForm={setShowForm} name={user?.fullName} hostel={user?.hostel} />) : (<ComplaintHistory setShowForm={setShowForm} />)
                    }
                </div>
            </div>
        </div>
    )
}
