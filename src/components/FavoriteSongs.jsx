import React, { useEffect, useState } from "react";
import axios from "../axios/userInstance";
import { useSelector } from "react-redux";
import { SongCard } from "../components";

function FavoriteSongs() {
  const { userId } = useSelector((state) => state.userSlice);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [data, setData] = useState();
  const [songData, setSongData] = useState();
  const [refresh, setRefresh] = useState(false);

  const {token} = useSelector((state)=>state.userSlice)

  useEffect(() => {
    axios({
      url: "/favoriteSongs",
      method: "POST",
      headers:{
        "Authorization": `${token}`
      },
      data: {
        userId,
      },
    }).then((res) => {
      console.log(res, "the response");
      setData(res.data.tracks);
      setSongData(res.data);
    });
  }, [refresh]);

  const refreshInvoker = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h3 className="text-lg text-white/50 font-bold font-sans pt-5">
        Favorite Songs
      </h3>
      <div className=" flex flex-wrap sm:justify-start justify-center gap-8">
        {songData?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            refreshInvoker={refreshInvoker}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteSongs;
