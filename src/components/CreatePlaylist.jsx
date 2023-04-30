import React, { useEffect, useState } from "react";
import img from "../assets/img/playlist.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios/userInstance";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { MdDelete } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { SongCard } from "../components";

function CreatePlaylist() {
  var filteredSongs;
  const [data, setData] = useState();
  const { userId } = useSelector((state) => state.userSlice);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [mapData, setMapData] = useState([]);
  const [shower, setShower] = useState(false);
  const [playId, setPlayId] = useState();
  const [playlistId, setPlaylistId] = useState();
  const [reloader, setReloader] = useState(false);
  const [songData, setSongData] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "POST",
      url: "/getPlaylists",
      data: {
        userId,
      },
    }).then((res) => {
      console.log(res, "res");
      setData(res?.data?.data);
    });
  }, [mapData]);

  // const handlePlay = (song, i) => {
  //   dispatch(setActiveSong({ song, data, i }));
  //   dispatch(playPause(true));
  // };
  // const handlePause = () => {
  //   dispatch(playPause(false));
  // };

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
    filteredSongs = filteredSongs[0];

    console.log(filteredSongs?.songs, "filtered---- songs");
    console.log(filteredSongs, "the filtered songs ");
    console.log(data, "the data ");

    setSongData(filteredSongs?.songs);
    // setMapData(filteredSongs?.songs);
    setShower(true);
  };

  const songRemover = async (id, playlistId) => {
    console.log(id, "its working here and song id here");
    console.log("the playlist id here ", playlistId);

    await axios({
      url: "/deletePlaylistSongs",
      method: "POST",
      data: {
        playlistId: playlistId,
        songId: id,
      },
    }).then((res) => {
      console.log(res.data);
      setMapData(res.data.updatedPlaylist);
      setReloader(true);
    });
  };

  const deletePlaylist = async (id) => {
    console.log("the log", id);

    await axios({
      url: "/deletePlaylist",
      method: "POST",
      data: {
        playlistId: id,
        userId: userId,
      },
    }).then((res) => {
      console.log(res, "the response");
      setMapData(res.data.datas);
    });
  };

  return (
    <>
      <div className="flex sm:flex-row flex-col justify-start p-10 ">
        <div>
          <img
            onClick={playListCreation}
            src={img}
            alt="no Img"
            className="h-28 w-28 hover:cursor-pointer"
          />
          <h2 className="text-lg text-white/50 pt-2">Create Playlist</h2>
        </div>
        <div className="flex ">
          {/* {data?.map((playlist) => (
            <div className="pl-10 gap-6">
              <img
                key={playlist._id}
                onClick={() => {
                  playlistSongs(playlist._id), setPlaylistId(playlist._id);
                }}
                src={playlist?.image}
                alt="img"
                className="h-28 w-28 hover:cursor-pointer rounded-full "
              />
              <IoCloseSharp className="w-6 h-6 text-white " />
              <h2 className="text-lg text-white/50 text-center pt-2">
                {playlist?.name}
              </h2>
            </div>
          ))} */}
          {data?.map((playlist) => (
            <div className="pl-10 gap-6 ">
              <div className="relative">
                <img
                  key={playlist._id}
                  onClick={() => {
                    playlistSongs(playlist._id), setPlaylistId(playlist._id);
                  }}
                  src={playlist?.image}
                  alt="img"
                  className="h-28 w-28 hover:cursor-pointer rounded-full "
                />
                <button
                  onClick={() => {
                    deletePlaylist(playlist._id);
                  }}
                  className="absolute top-0 right-0 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center"
                >
                  <IoCloseSharp className="w-4 h-4 text-white" />
                </button>
              </div>
              <h2 className="text-lg text-white/50 text-center pt-2">
                {playlist?.name}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        {shower && (
          <h2 className="text-lg text-white/50 pb-5">Playlist Songs </h2>
        )}
        <div className="flex flex-row justify-start gap-8 pt-10">
          {songData?.map((song, i) => (
            <div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    songRemover(song?._id, playlistId);
                  }}
                  className="top-0 right-0 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center"
                >
                  <IoCloseSharp className="w-4 h-4 text-white" />
                </button>
              </div>
              <div>
                <SongCard
                  key={song.key}
                  song={song}
                  i={i}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={songData}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CreatePlaylist;
