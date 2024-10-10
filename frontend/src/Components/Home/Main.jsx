import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Gatepass from "../Gatepass/Gatepass";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoute";
import Complaints from "../Complaints/Complaints";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              component={Homepage}
              allowedRoles={["Student", "Warden", "Admin"]}
            />
          }
        />
        <Route
          path="/gatepass"
          element={
            <ProtectedRoute
              component={Gatepass}
              allowedRoles={["Student", "Warden", "Admin"]}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              component={Profile}
              allowedRoles={["Student", "Warden", "Admin"]}
            />
          }
        />
        <Route
          path="/complaints"
          element={
            <ProtectedRoute
              component={Complaints}
              allowedRoles={["Student", "Warden", "Admin"]}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Main;
