import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSpecificSongsQuery } from "../redux/services/shazam";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../axios/userInstance'

const Search = () => {
  const [songData,setSongData] = useState()
  const { term } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {token} = useSelector((state)=>state.userSlice)

  // const { data, isFetching, error } = useGetSpecificSongsQuery(term);

  useEffect(()=>{
    axios({
      url:"/searchFinder",
      method:"POST",
      headers:{
        "Authorization": `${token}`
      },
      data:{
        term
      }
    }).then((res)=>{
      setSongData(res?.data?.tracks)
      console.log(songData,'the response');
    })
  },[term])

  // if (isFetching) return <Loader title="Loading Top Charts" />;

  // if (error) return <Error />;


  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-xl text-white text-left mt-4 mb-10">
        Search Songs
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songData?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songData}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
