import React, { useEffect, useState } from "react";
import axios from "../axios/userInstance";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { SongCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/features/userSlice";

function ProfileUser() {
  const { userId, token } = useSelector((state) => state.userSlice);
  const state = useSelector((state) => state.userSlice);
  console.log(userId, "the userid");

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState();
  const [mobile, setMobile] = useState();
  const [location, setLocation] = useState();
  const [language, setLanguate] = useState();
  const [img, setImg] = useState();
  const [ImgUrl, setImgUrl] = useState();
  const [data, setData] = useState();

  const [songData, setSongData] = useState();
  const [artistSongCount, setArtistSongCount] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handlePlay = (song, i) => {
  //   dispatch(setActiveSong({ song, data, i }));
  //   dispatch(playPause(true));
  // };
  // const handlePause = () => {
  //   dispatch(playPause(false));
  // };

  console.log(img, "this the img daata", img?.name);

  useEffect(() => {
    const dataCollector = async () => {
      await axios({
        url: "/dataCollector",
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        data: {
          userId: userId,
        },
      }).then((res) => {
        console.log(res.data, "the datasdd");
        const dt = res.data.data;

        setSongData(res.data);
        setData(res.data.tracks);

        setName(dt?.name);
        setEmail(dt?.email);
        setDob(dt?.dob);
        setMobile(dt?.number);
        setLocation(dt?.location);
        setLanguate(dt?.language);
        setImgUrl(dt?.imgUrl);
      });
    };
    dataCollector();
  }, []);

  useEffect(() => {
    axios({
      url: "/findArtistSongs",
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      data: {
        artistId: userId,
      },
    }).then((res) => {
      console.log("the response in here", res);
      setArtistSongCount(res?.data?.tracks?.length);
    });
  });

  const handleImgUploader = (e) => {
    setImg(e.target.files[0]);
    const image = e.target.files[0];
    console.log(image);

    const imageref = ref(storage, `/artist/${image?.name}`);
    console.log(imageref, "image");
    const uploadtask = uploadBytesResumable(imageref, image);
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
          console.log(downloadURL);
          console.log("Image Uploaded successfully");

          setImgUrl(downloadURL);
        });
      }
    );
  };

  const profileSubmit = async (e) => {
    e.preventDefault();
    console.log("sdf");

    await axios({
      url: "/profileSubmit",
      headers: {
        Authorization: `${token}`,
      },
      method: "POST",
      data: {
        name: name,
        email: email,
        dob: dob,
        mobile: mobile,
        location: location,
        language: language,
        id: userId,
        imgUrl: ImgUrl,
      },
    }).then((response) => {
      console.log(response, "the response data");

      if (response.data.message === "success") {
        message.success("Profile Updated Successfully");
        dispatch(
          setLogin({
            ...state,
            profile: true,
          })
        );
      } else {
        message.error("Profile Updated Failed");
      }
    });
  };

  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const deleteSong = async (id) => {
    console.log("the song id", id);

    await axios({
      url: "/deleteSongs",
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      data: {
        songId: id,
        userId: userId,
      },
    }).then((res) => {
      console.log(res.data, "the response .data");
      setSongData(res.data);
    });
  };

  const songEditer = async (songId) => {
    console.log("the songid", songId);
    navigate(`/edit-songs/${songId}`);
  };

  return (
    <div className="h-full bg-gradient-to-br from-black to-[#121286] p-8">
      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[250px]">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
          />
        </div>
        <div className="flex flex-col items-center -mt-20">
          <img
            src={ImgUrl}
            // className="w-40 border-4 border-white rounded-full h-40"
            className="w-36  h-36 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl">{name}</p>
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        {/* <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <span>Connect</span>
            </button>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Message</span>
            </button>
          </div>
        </div> */}
      </div>

      <form
        onSubmit={(e) => {
          profileSubmit(e);
        }}
      >
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Full name:</span>
                <input
                  type="text"
                  className="text-gray-700"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Birthday:</span>
                <input
                  type="text"
                  className="text-gray-700"
                  required
                  placeholder="DOB"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </li>

              <li className="flex border-b py-2">
                <span className="font-bold w-24">Mobile:</span>
                <input
                  type="number"
                  value={mobile}
                  required
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  className="text-gray-700"
                  placeholder="Number"
                />
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="text-gray-700"
                  placeholder="Email"
                />
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Location:</span>
                <input
                  type="text"
                  value={location}
                  required
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  className="text-gray-700"
                  placeholder="Place"
                />
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Languages:</span>
                <input
                  type="text"
                  value={language}
                  required
                  onChange={(e) => {
                    setLanguate(e.target.value);
                  }}
                  className="text-gray-700"
                  placeholder="Language"
                />
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Profile Photo:</span>
                <input
                  type="file"
                  name="imgFile"
                  accept="image/*"
                  required
                  onChange={handleImgUploader}
                  className="text-gray-700"
                  placeholder="Email"
                />
              </li>
            </ul>
            <div className="flex justify-end pt-5">
              <button
                className=" bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>

      {artistSongCount != 0 && (
        <h2 className="text-xl text-white text-center pt-5">Your Songs</h2>
      )}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songData?.tracks?.map((song, i) => (
          <div className="pt-5">
            <div className="flex justify-between ">
              <button
                onClick={() => {
                  songEditer(song._id);
                }}
                key={song?.title}
                className="top-0 left-0 z-10 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center"
                // style={{ position: "relative" }}
              >
                <MdOutlineModeEditOutline className="w-4 h-4 text-white" />
              </button>
              <button
                key={song?._id}
                onClick={() => {
                  deleteSong(song._id);
                }}
                className="top-0 left-0 z-10 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center"
                style={{ position: "relative" }}
              >
                <IoCloseSharp className="w-4 h-4 text-white" />
              </button>
            </div>

            <div>
              <SongCard
                key={song.key}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileUser;
