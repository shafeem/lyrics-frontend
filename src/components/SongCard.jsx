import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { AiFillHeart } from "react-icons/Ai";
import { FiMoreVertical } from "react-icons/fi";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };

  const favoriteSongs = async (id) => {
    console.log("the favorite songs", id);
  };

  const moreFuntion = async (id) => {
    console.log("the morefuntionality here", id);
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer ">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song?.title
              ? // ||  activeSong?.track?.title === song?.track?.title
                "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
        </div>

        <img src={song.images?.coverart || song.hub?.image} alt="img" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {/* <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
         */}
          <Link to={`/artists/${song.artists?.[0]?.adamid}`}>
            {song?.subtitle}
          </Link>
          <div className="flex flex-row-reverse ">
            <button onClick={()=>moreFuntion(song._id)}>
              <FiMoreVertical className="w-6 h-6" />
            </button>
            <button className="text-red-700" onClick={()=>favoriteSongs(song._id)}>
              <AiFillHeart className="w-6 h-6" />
            </button>
          </div>
        </p>
      </div>
    </div>
  );
};
export default SongCard;
