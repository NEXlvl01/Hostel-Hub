import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import StudentComplaints from './StudentComplaints';
import WardenComplaints from './WardenComplaints';

export default function Complaints() {

    const {user} = useContext(AppContext);

  return (
    <div>
      {
        user?.role === "Student" ? (<StudentComplaints/>) : (<WardenComplaints/>)
      }
    </div>
  )
}
