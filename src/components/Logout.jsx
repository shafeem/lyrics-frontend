import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setLogout} from '../redux/features/userSlice'

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(
      setLogout({
        number: null,
        email: null,
        token: null,
        userType:null,
        userId:null,
        profile:null,
      })
    );
    console.log("logout successfully worked");
    navigate("/");
  };

  useEffect(() => {
    logout();
  }, []);

  return;

  <div></div>;
}

export default Logout;
