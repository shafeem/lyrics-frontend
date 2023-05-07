import React from "react";
import Login from "../../components/admin/AdminLog";

const AdminLogin = () => {
  return (
    <>
      <div className="flex-1 px-2 sm:px-0 min-h-screen bg-gradient-to-br from-black to-[#121286]">
        <div className="flex justify-between items-center">
          {/* <h3 className="pl-10 pt-5 text-xl font-extralight text-white/50">Login</h3> */}
        </div>

        <div className="mt-16">{<Login />}</div>
      </div>
    </>
  );
};

export default AdminLogin;
