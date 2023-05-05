import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectedRoutes = () => {
  const clientTokens = useSelector((state) => state.userSlice.token);
  console.log(clientTokens, "the token here");

  return (
     clientTokens ? <Outlet /> :<Navigate to='/login' />
  );
};

export default UserProtectedRoutes;
