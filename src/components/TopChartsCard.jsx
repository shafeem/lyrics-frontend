import React from "react";
import PlayPause from "./PlayPause";

const TopChartsCard = ({
  song,
  i,
  handlePause,
  handlePlay,
  isPlaying,
  activeSong,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[rgb(76,66,110)] py-2 p-4 rounded-lg cursor-pointer mb-2">
    {/* <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3> */}
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg "
        src={song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <p className="text-base font-bold text-white">{song?.title}</p>
        <p className="text-sm text-gray-300 mt-1 ">{song?.subtitle}</p>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePause}
      handlePlay={handlePlay}
    />


  </div>
);

export default TopChartsCard;
