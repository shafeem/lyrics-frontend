import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/Ai";
import axios from "../axios/userInstance";
import { MdPlaylistAdd } from "react-icons/md";
import { message } from "antd";

const SongCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  data,
  refreshInvoker,
}) => {
  const [likedSongs, setLikedSongs] = useState();
  const [tabOpener, setTapOpener] = useState(false);
  const [playData, setPlayData] = useState();
  const [songId, setSongId] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.userSlice);

  useEffect(() => {
    axios({
      url: "/likedSongFinder",
      method: "POST",
      data: {
        userId,
      },
    }).then((res) => {
      setLikedSongs(res.data.userDetails.likedSongs);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "POST",
      url: "/getPlaylists",
      data: {
        userId,
      },
    }).then((res) => {
      setPlayData(res?.data?.data);
    });
  }, []);

  const songAdder = async (id) => {
    await axios({
      url: "/addSongToPlaylist",
      method: "POST",
      data: {
        songId: songId,
        playId: id,
      },
    }).then((res) => {
      console.log(res, "the response at the songcard");
      if (res.data.message == "success") {
        message.success("Song Added Successfully");
        setTapOpener(!tabOpener);
      } else {
        message.error("Song Already There");
      }
    });
  };

  const handlePlay = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };

  const handleLikeSongs = async (id) => {
    console.log("the favorite songs", id);

    await axios({
      url: "/handleLikeSongs",
      method: "POST",
      data: {
        songId: id,
        userId,
      },
    }).then((res) => {
      setLikedSongs(res.data.user.likedSongs);
      if(refreshInvoker){
        refreshInvoker()
      }
    });
  };

  const moreFuntion = async (id) => {
    console.log("the morefuntionality here", id);
    setSongId(id);
    setTapOpener(!tabOpener);
  };

  return (
    <>
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
            {song.title}
          </p>
          <p className="text-sm truncate text-gray-300 mt-1">
            <Link to={`/artists/${song.artists}`}>{song?.subtitle}</Link>
          </p>
          <div className="flex flex-row-reverse " key={song._id}>
            <button onClick={() => moreFuntion(song._id)}>
              <MdPlaylistAdd className="w-6 h-6 text-white/70 hover:cursor-pointer" />
            </button>

            <button
              className="text-red-700"
              onClick={() => {
                handleLikeSongs(song._id);
              }}
            >
              {likedSongs?.includes(song._id) ? (
                <AiFillHeart className="w-6 h-6" />
              ) : (
                <AiOutlineHeart className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`${tabOpener ? "active" : "hidden"} `}>
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  {playData?.length !== 0 ? (
                    <h2 className="text-black text-lg pb-3">Select PlayList</h2>
                  ) : (
                    <h2 className="text-black text-lg pb-3">Create Playlist</h2>
                  )}
                  {playData?.map((play, i) => (
                    <div
                      className="sm:flex sm:items-start pb-3 hover:bg-slate-400 pl-5 pt-3 rounded-lg"
                      key={play?._id}
                      onClick={() => {
                        songAdder(play?._id);
                      }}
                    >
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <img
                          src={play?.image}
                          alt=""
                          className="rounded-full"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6  text-gray-900 pt-2"
                          id="modal-title"
                        >
                          {play?.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={() => {
                      setTapOpener(!tabOpener);
                    }}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto bg-red-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      navigate("/createPlaylist");
                    }}
                    type="button"
                    className="mt-3 inline-flex w-full rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto bg-blue-200"
                  >
                    Create Playlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SongCard;
