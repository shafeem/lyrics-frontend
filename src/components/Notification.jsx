import React from 'react';
import Fade from '@mui/material/Fade';
import Grow from "@mui/material/Grow";

const Notification = ({handleClick, children, isOpen ,name}) => {


  return (

    <Grow in={isOpen}>

    <div className="absolute top-0 right-5 z-50">
      <div className="modal-overlay" onClick={handleClick}></div>
      <div className="modal-content bg-white max-w-lg mx-auto my-10 p-6 rounded-lg shadow-md">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="modal-title text-lg font-bold">{name}</h2>
          <button className="modal-close cursor-pointer bg-transparent border-none text-gray-500 text-xl font-bold" onClick={handleClick}>
            X
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
    </Grow>
  );
};

export default Notification;