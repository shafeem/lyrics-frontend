import React, { useState } from "react";
import axios from "../../axios/adminInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/features/adminSlice";
import back from "../../assets/img/back.jpg";
import backg from "../../assets/img/backg.jpeg";

const AdminLog = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailSetter = (e) => {
    setEmail(e.target.value);
  };
  const passwordSetter = (e) => {
    setPassword(e.target.value);
  };

  const verifyChecker = async (e) => {
    e.preventDefault();

    await axios
      .post(`/adminVerify?Email=${Email}&password=${password}`)
      .then((response) => {
        const data = response.data.message;

        console.log(response.data, "this is the data from the adminLog page");

        if (data == "Email Error" || data == "Password Error") {
          toast.error(data, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success(data, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          dispatch(
            setLogin({
              token: response.data.token,
            })
          );
          navigate("/admin/dashbord");
        }
      });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full  xl:w-3/4 lg:w-11/12 flex justify-center pt-10 h-96">
            <div
              className=" w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage: ` url(${backg})`,
              }}
            />
          <div className="w-5/12 bg-white/5 p-5 rounded-lg lg:rounded-l-none flex justify-center">
            {" "}
            <form className="" onSubmit={verifyChecker}>
              <div className="mb-2 pt-10 w-52" >
                <label className="block text-sm font-semibold text-white/50">
                  Email
                </label>
                <input
                  type="text"
                  onChange={emailSetter}
                  placeholder="Enter Your Email"
                  className="block w-full px-4 py-2 mt-2 text-gray-800 bg-slate-200 rounded-md focus:border-gray-800 focus:outline-none focus:ring focus:ring-opacity-100"
                />
              </div>
              <div className="mt-3">
                <label className="block text-sm font-semibold text-white/50">
                  PassWord
                </label>
                <input
                  onChange={passwordSetter}
                  type="password"
                  placeholder="xxxxx"
                  className="block w-full px-4 py-2 mt-2 text-gray-800 bg-slate-200 rounded-md focus:border-gray-800 focus:outline-none focus:ring focus:ring-opacity-100"
                />
              </div>
              <div className="mt-6">
                <button className="items-center justify-center w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-gray-800  focus:outline-none focus:bg-gray-800">
                  Submit
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLog;
