import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./routes/User";
import Admin from "./routes/Admin";
import Login from "./pages/Login.";
import AdminLogin from "./pages/admin/AdminLogin";
import { ErrorPage } from "./pages";

// import firebase from './firebase/firebase'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
