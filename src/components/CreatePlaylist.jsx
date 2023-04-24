import React, { useEffect, useState } from "react";
import img from "../assets/img/playlist.png";
import { useNavigate,Link } from "react-router-dom";
import axios from "../axios/userInstance";
import { useSelector } from "react-redux";

function CreatePlaylist() {


useEffect(()=>{
    axios({
        method: "GET",
        url:"/getPlaylists",
    }).then((res)=>{
        console.log(res,'the response');
    })
})




  const { userId } = useSelector((state) => state.userSlice);
  const [playId, setPlayId] = useState();
  const navigate = useNavigate()

  const playListCreation = async () => {
    await axios({
      method: "post",
      url: "/createPlaylist",
      data: {
        userId: userId,
      },
    }).then((res) => {
      console.log(res);
      setPlayId(res.data.playlistId);
      navigate(`/playlist/${res.data.playlistId}`)

    })
  };

  console.log(playId,'the playid');

  return (
    <div className="flex sm:flex-col flex-row justify-start p-10 ">
      <div>
        <Link onClick={playListCreation}>
          <img
            src={img}
            alt="no Img"
            className="h-28 w-28 hover:cursor-pointer"
          />
          <h2 className="text-white font-bold text-lg">Create Playlist</h2>
        </Link>
      </div>
    </div>
  );
}

export default CreatePlaylist;
