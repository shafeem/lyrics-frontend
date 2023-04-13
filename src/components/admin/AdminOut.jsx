import React, { useEffect } from "react";
import { setLogout } from "../../redux/features/adminSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function AdminOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(
      setLogout({
        token: null,
        email: null,
      })
    );

    console.log("this is working?");
    navigate("/admin/");
  };

  useEffect(() => {
    logout();
  }, []);

  return <div></div>;
}

export default AdminOut;
