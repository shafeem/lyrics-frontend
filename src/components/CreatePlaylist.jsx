import React, { useEffect, useState } from "react";
import img from "../assets/img/playlist.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios/userInstance";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { MdDelete } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

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
      console.log(res?.data?.data, "the response");
      setData(res?.data?.data);
    });
  }, [mapData]);

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };

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
    setMapData(filteredSongs?.songs);
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

  return (
    <div>
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
                    // handle close button click
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
      <div className="flex flex-col w-8/12 pt-14 ">
        {shower && (
          <h2 className="text-lg text-white/50 pb-5">Playlist Songs </h2>
        )}
        {mapData?.map((song, i) => (
          <div>
            <div className="w-full flex flex-row items-center bg-slate-400 hover:bg-[rgb(76,66,110)] py-2 p-4 rounded-lg cursor-pointer mb-2">
              <div className="flex-1 flex flex-row justify-between items-center">
                <img
                  className="w-20 h-20 rounded-lg "
                  src={song?.images?.coverart}
                  alt={song?.title}
                />
                <div className="flex-1 flex flex-col justify-center mx-3">
                  <p className="text-base font-bold text-black">
                    {song?.title}
                  </p>
                  <p className="text-sm text-gray-800 mt-1 ">
                    {song?.subtitle}
                  </p>
                </div>
              </div>
              <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePause}
                handlePlay={() => handlePlay(song, i)}
              />
              <MdDelete
                className="ml-10 h-7 w-7 "
                onClick={() => {
                  songRemover(song?._id, playlistId);
                }}
              />
              {/* <div className="pl-10">
        {!button ? (
          <button
            key={song?._id}
            onClick={() => {
              setButton(true);
              addPlaylistSong(song?._id);
            }}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Add
          </button>
        ) : (
          <button
            key={song?._id}
            onClick={() => {
              deletePlaylistSongs(song?._id);
              setButton(false);
            }}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Remove
          </button>
        )}
      </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatePlaylist;
