import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserPublicRoutes() {
  const clientToken = useSelector((state) => state.userSlice.token);
  console.log(clientToken, "the token here");

  return clientToken ? <Outlet /> : <Navigate to={"/"} />;
}

export default UserPublicRoutes;
