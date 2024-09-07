import React, { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import StudentGatepass from './StudentGatepass';
import WardenGatepass from './WardenGatepass';

export default function Gatepass() {

  const {user} = useContext(AppContext);

  return (
    <div>
      {
        user?.role === 'Student' ? (<StudentGatepass/>) : (<WardenGatepass/>)
      }
    </div>
  )
}
