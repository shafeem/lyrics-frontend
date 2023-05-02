import SongBar from "./SongBar";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

const RelatedSongs = ({ data, isPlaying, activeSong, artistId }) => {
  const dispatch = useDispatch();

  const handlePlay = (song,i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-white text-xl pt-5">Artist Songs :</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePause}
            handlePlay={()=>handlePlay(song,i)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
