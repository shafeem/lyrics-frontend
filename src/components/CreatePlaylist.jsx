import React, { useEffect, useState } from "react";
import img from "../assets/img/playlist.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios/userInstance";
import { useSelector } from "react-redux";
import { TopChartsCard } from "../components";

function CreatePlaylist() {
    var filteredSongs;
  const [data, setData] = useState();
  const { userId } = useSelector((state) => state.userSlice);

  useEffect(() => {
    axios({
      method: "POST",
      url: "/getPlaylists",
      data: {
        userId,
      },
    }).then((res) => {
      console.log(res?.data?.data, "the response");
      setData(res?.data?.data);
    });
  }, []);

  const [playId, setPlayId] = useState();
  const navigate = useNavigate();

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
      navigate(`/playlist/${res.data.playlistId}`);
    });
  };

  const playlistSongs = async (id) => {
    filteredSongs = data.filter((songs) => songs._id === id);

    console.log(filteredSongs, "the id ", id);
  };

  console.log(playId, "the playid");

  return (
    <div className="flex sm:flex-row flex-col justify-start p-10 ">
      <div>
        <img
          onClick={playListCreation}
          src={img}
          alt="no Img"
          className="h-28 w-28 hover:cursor-pointer"
        />
        <h2 className="text-white font-bold text-lg pt-2">Create Playlist</h2>
      </div>
      <div className="flex ">
        {data?.map((playlist) => (
          <div className="pl-10 gap-6">
            <img
              key={playlist._id}
              onClick={() => playlistSongs(playlist._id)}
              src={playlist?.image}
              alt="img"
              className="h-28 w-28 hover:cursor-pointer rounded-full "
            />
            <h2 className="text-white font-bold text-lg text-center pt-2">
              {playlist?.name}
            </h2>
          </div>
        ))}
      </div>
      <div>
        {filteredSongs?.songs?.map((song, i) => {
          <TopChartsCard 
            
          />
        })}
      </div>
    </div>
  );
}

export default CreatePlaylist;
