import React, { useState, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";
import axios from "../axios/userInstance";
import { useSelector, useDispatch } from "react-redux";
import back from "../assets/img/background.jpg";
import { TopChartsCard } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useParams,useNavigate } from "react-router-dom";

function UserPlaylist() {
  const navigate = useNavigate();
  const { id: playId } = useParams();

  const [playlistName, setPlaylistName] = useState("");
  const [playlistImg, setPlaylistImg] = useState();
  const [imgSetter, setImgSetter] = useState();
  const [playlistId, setPlaylistId] = useState(playId);
  const [done,setDone] = useState(false);

  const [musicHider, setMusicHider] = useState(false);

  const [data, setData] = useState();
  const dispatch = useDispatch();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { userId } = useSelector((state) => state.userSlice);

  useEffect(() => {
    axios({
      url: "/songFinder",
      method: "GET",
    }).then((res) => {
      console.log(res, "the response here ");
      setData(res.data.tracks);
    });
  }, []);

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };

  const playlistUploader = async (e) => {
    e.preventDefault();
    await axios({
      url: "/playlistSubmitter",
      method: "POST",
      data: {
        playlistImg: playlistImg,
        playlistName: playlistName,
        playId: playId,
        userId: userId,
      },
    }).then((res) => {
      setImgSetter(false)
      setDone(true)
      console.log("its worked");
      if (res.data.message == true) setMusicHider(true);
    });
  };

  const handleImgUploader = async (e) => {
    setPlaylistImg(e.target.files[0]);
    const playlist = e.target.files[0];

    const playlistref = ref(storage, `/playlistImg/${playlist?.name}`);
    console.log(playlistref, "playlist of song");
    const uploadtask = uploadBytesResumable(playlistref, playlist);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL, "Image Uploaded successfully");
          setPlaylistImg(downloadURL);
          setImgSetter(true);
        });
      }
    );
  };

  const playlistDone = (e)=>{
    e.preventDefault();
    navigate('/createPlaylist')
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage: ` url(${back})`,
              }}
            />
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create Playlist</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                {!musicHider ? (
                  <div>
                    <div className="mb-4 md:flex md:justify-between">
                      <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="firstName"
                        >
                          Playlist Name
                        </label>
                        <input
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          type=""
                          required
                          value={playlistName}
                          onChange={(e) => {
                            setPlaylistName(e.target.value);
                          }}
                          placeholder="Playlist Name"
                        />
                      </div>
                    </div>

                    <div className="mb-4 md:flex md:justify-between">
                      <div className="md:ml-2">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="c_password"
                        >
                          Image
                        </label>
                        <input
                          type="file"
                          name="imgFile"
                          accept="image/*"
                          required
                          onChange={handleImgUploader}
                          className="text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                <hr className="mb-10 border-t" />
                {musicHider ? (
                  <div>
                    <h2 className="text-black text-lg">Songs For PlayList </h2>
                    <div className="mt-10  flex flex-col  gap-1">
                      {data?.map((song, i) => (
                        <div
                          key={song?._id}
                          className="flex items-center  w-[90%]"
                        >
                          <TopChartsCard
                            song={song}
                            key={song.key}
                            i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePause={handlePause}
                            handlePlay={() => handlePlay(song, i)}
                            playlistId={playlistId}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="mb-6 text-center">
                  {imgSetter ? (
                    <button
                      onClick={(e) => {
                        playlistUploader(e);
                      }}
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Save
                    </button>
                  ) : null}
                  {done ? (
                      <button
                      onClick={(e) => {
                        playlistDone(e);
                      }}
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Done
                    </button>
                  ):null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPlaylist;
