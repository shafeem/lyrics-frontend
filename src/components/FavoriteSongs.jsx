import React, { useEffect, useState } from "react";
import axios from "../axios/userInstance";
import { useSelector } from "react-redux";
import { SongCard } from "../components";

function FavoriteSongs() {
  const { userId } = useSelector((state) => state.userSlice);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [data, setData] = useState();
  const [songData,setSongData] = useState();

  useEffect(() => {
    axios({
      url: "/favoriteSongs",
      method: "POST",
      data: {
        userId,
      },
    }).then((res) => {
      console.log(res, "the response");
      setData(res.data.tracks);
      setSongData(res.data)
    });
  }, []);

  return (
    <div>
      <h3 className="text-lg text-white/50 font-bold font-sans pt-5">
        Favorite Songs
      </h3>
      <div>
        {songData?.tracks?.map((song,i) => (
             <SongCard
             key={song.key}
             song={song}
             i={i}
             isPlaying={isPlaying}
             activeSong={activeSong}
             data={data}
           />
        ))}
      </div>
    </div>
  );
}

export default FavoriteSongs;
