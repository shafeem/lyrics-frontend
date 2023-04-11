import React, { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import Notification from "./Notification";
import { useSelector,useDispatch } from "react-redux";
import axios from "../axios/userInstance";
import {setLogin} from '../redux/features/userSlice'
// import { response } from "express";

function Setting() {
  const { userType, userId } = useSelector((state) => state.userSlice);
  const state = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const [artist, setArtist] = useState(userType === "artist");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setArtist(userType === "artist");
  }, [userType]);

  const userChanger = () => {
    setOpen(true);
    console.log("its changing here");
  };
  const confirmationCaller = async () => {
    console.log("this is the log working in the setting page");

    await axios({
      url: "/rolechanger",
      method: "POST",
      data: {
        id: userId,
      },
    }).then((response) => {
      console.log(response,'this is the response');

      dispatch(
        setLogin({
          ...state,
        userType:response.data.userType
      })
      );
    setOpen(false);
    });

  };
  return (
    <>
      <div className="flex justify-between items-center gap-4 w-full">
        <h1 className="text-base">Become An Artist</h1>
        <Switch
          checked={artist}
          onChange={() => {
            if (!artist) {
              userChanger();
            }
          }}
          className="pb-3"
          inputProps={{ "aria-label": "controlled" }}
        />
        <Notification />
      </div>
      <input
        type="checkbox"
        checked={open}
        id="my-modal-6"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations</h3>
          <p className=" pt-7">
            After the admin confirmation you can upload your own song to the
            sight.May be its take some time please be patient .Enjoy new
            features.
          </p>
          <div className="modal-action">
            <button
              onClick={() => {
                confirmationCaller();
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded"
            >
              Ok
            </button>
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
            >
              Cancell
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
