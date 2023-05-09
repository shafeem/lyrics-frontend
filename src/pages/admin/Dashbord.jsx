import React, { useEffect, useState } from "react";
import { BsFillFileMusicFill } from "react-icons/bs";
import { TiUserAdd } from "react-icons/ti";
import { RiUser3Fill } from "react-icons/ri";
import axios from "../../axios/adminInstance";
import { useSelector } from "react-redux";

function Dashbord() {
  const [userDetails, setUserDetails] = useState();
  const [songDetails, setSongDetails] = useState();
  const [artistDetails, setArtistDetails] = useState();
  const [user, setUser] = useState();
  const [artist, setArtist] = useState();
  const [song, setSong] = useState();

  const {token} = useSelector((state)=>state.adminSlice)


  useEffect(() => {
    axios({
      url: "/findingUsers",
      method: "GET",
      headers:{
        "Authorization": `${token}`
      },
    }).then((res) => {
      console.log(res,'the response');
      setUserDetails(res?.data?.user);
    });
  }, []);

  useEffect(() => {
    axios({
      url: "/songFinder",
      method: "GET",
      headers:{
        "Authorization": `${token}`
      },
    }).then((res) => {
      setSongDetails(res?.data?.tracks);
    });
  }, []);

  useEffect(() => {
    axios({
      url: "/findArtist",
      method: "GET",
      headers:{
        "Authorization": `${token}`
      },
    }).then((res) => {
      setArtistDetails(res?.data?.artistDetails);
    });
  }, []);

  console.log(
    userDetails,
    "user",
    songDetails,
    "song",
    artistDetails,
    "artist"
  );

  return (
    <div className="flex w-full ">
      <div class="flex flex-col sm:flex-row w-full pt-10 gap-8">
        <div class="flex  flex-row bg-white/10 h-36 rounded-lg w-full hover:scale-105 sm:w-1/3 gap-1">
          <div className="bg-white/90 py-1 rounded-lg w-1/4 flex justify-center pt-8">
            <div className="">
              <BsFillFileMusicFill
                size={70}
                className="text-blue-900 flex items-center justify-center"
              />
            </div>
          </div>
          <div className="w-3/4 rounded-lg bg-white/90 text-center">
            <h2 className="text-black text-lg pt-3"> Total Songs :</h2>
            <h2 className="text-black text-5xl font-bold pt-3">
              {songDetails?.length == undefined ? 0 : songDetails?.length}{" "}
            </h2>
          </div>
        </div>
        <div class="flex flex-row bg-white/10 h-36 rounded-lg w-full hover:scale-105 sm:w-1/3 gap-1">
          <div className="bg-white/90 py-1 rounded-lg w-1/4 flex justify-center pt-8">
            <div className="">
              <RiUser3Fill
                size={70}
                
                className="text-blue-900 flex items-center justify-center"
              />
            </div>
          </div>
          <div className="w-3/4 rounded-lg bg-white/90 text-center">
            <h2 className="text-black text-lg pt-3"> Total Users :</h2>
            <h2 className="text-black text-5xl font-bold pt-3">
              {userDetails?.length == undefined ? 0 : userDetails?.length}{" "}
            </h2>
          </div>
        </div>
        <div class="flex flex-row bg-white/10 h-36 rounded-lg w-full hover:scale-105 sm:w-1/3 gap-1">
          <div className="bg-white/90 py-1 rounded-lg w-1/4 flex justify-center pt-8">
            <div className="">
              <TiUserAdd
                size={70}
                className="text-blue-900 flex items-center justify-center"
              />
            </div>
          </div>
          <div className="w-3/4 rounded-lg bg-white/90 text-center">
            <h2 className="text-black text-lg pt-3"> Total Artists :</h2>
            <h2 className="text-black text-5xl font-bold pt-3">
              {artistDetails?.length == undefined ? 0 : artistDetails.length}
            </h2>
          </div>
        </div>
      </div>
    </div>

    //
  );
}

export default Dashbord;
