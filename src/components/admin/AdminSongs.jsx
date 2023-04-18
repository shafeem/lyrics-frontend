import React, { useEffect, useState } from "react";
import { Error, Loader, SongCard } from "../../components";
import axios from "../../axios/adminInstance";
import { useDispatch, useSelector } from "react-redux";

function AdminSongs() {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [songData,setSongData] = useState()

  useEffect(() => {
    const songFetcher = async () => {
      await axios({
        url: "/songFinder",
        method: "GET",
      }).then((res) => {
        console.log(res,'the response');
        setSongData(res.data)
      });
    };

    songFetcher();
  }, []);

  console.log(songData,'the songs here');


  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songData?.song?.map((song, i) => (    
          <SongCard
            key={song.subtitle}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
    ))}
      </div>
    </div>
  );
}

export default AdminSongs;
