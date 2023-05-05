import React, { useState } from "react";
import PlayPause from "./PlayPause";
import axios from "../axios/userInstance";
import { useSelector } from "react-redux";

const TopChartsCard = ({
  song,
  i,
  handlePause,
  handlePlay,
  isPlaying,
  activeSong,
  playlistId,
}) => {
  const [button, setButton] = useState(false);
  const [addSongs, setAddSongs] = useState();

  const { userId,token } = useSelector((state) => state.userSlice);

  const addPlaylistSong = async (songid) => {
    console.log(songid, "the id of the songs");
    await axios({
      url: "/addPlaylistSong",
      method: "POST",
      headers:{
        "Authorization": `${token}`
      },
      data: {
        playlistId: playlistId,
        songId: songid,
      },
    }).then((res) => {
      console.log(res, "the response of the addPlaylistSongs");
    });
  };

  const deletePlaylistSongs = async (songid) => {
    await axios({
      url: "/deletePlaylistSongs",
      method: "POST",
      headers:{
        "Authorization": `${token}`
      }, 
      data: {
        playlistId: playlistId,
        songId: songid,
      },
    }).then((res) => {
      console.log(res, "the response of the addPlaylistSongs");
    });
  };

  return (
    <div className="w-full flex flex-row items-center hover:bg-[rgb(76,66,110)] py-2 p-4 rounded-lg cursor-pointer mb-2">
      {/* <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3> */}
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg "
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="text-base font-bold text-black">{song?.title}</p>
          <p className="text-sm text-gray-800 mt-1 ">{song?.subtitle}</p>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
      <div className="pl-10">
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
      </div>
    </div>
  );
};

export default TopChartsCard;
