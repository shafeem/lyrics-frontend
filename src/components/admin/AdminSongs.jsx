import React, { useEffect, useState } from "react";
import { Error, Loader, SongCard } from "../../components";
import axios from "../../axios/adminInstance";
import { useDispatch, useSelector } from "react-redux";
import { BsCheck2 } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

function AdminSongs() {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { token } = useSelector((state) => state.adminSlice);

  // console.log(isPlaying,'the console of isPlaying');
  // console.log(activeSong,'the console of activeSong');

  const [songData, setSongData] = useState();
  const [likeShow, setLikeshow] = useState(false);
  const [refresher,setRefresher] = useState()

  useEffect(() => {
    const songFetcher = async () => {
      await axios({
        url: "/songFinder",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }).then((res) => {
        console.log(res, "the response");
        setSongData(res.data);
        setLikeshow(true);
      });
    };

    songFetcher();
  }, [refresher]);

const songRemover =async (id)=>{
  console.log('songremover',id);

  await axios({
    url:"/songRefuser",
    method:"POST",
    data:{
      id
    },
    headers:{
      Authorization:`${token}`
    }
  }).then((res)=>{
    console.log('the response here',res);
    setRefresher(res?.data)
  })
}

const songApprover =async (id)=>{
  console.log('songApprover',id);

  await axios({
    url:"/songApprover",
    method:'POST',
    data:{
      id
    },
    headers:{
      Authorization: `${token}`
    }
  }).then((res)=>{
    console.log('the response',res);
    setRefresher(res?.data?.song)
  })
}

  return (
    <>
      <h2 className="text-lg text-white/50 pb-5">Approved Songs </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songData?.tracks?.map((song, i) => (
          <div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
              <SongCard
                key={song.subtitle}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={songData.tracks}
                likeShow={likeShow}
              />
            </div>
          </div>
        ))}
      </div>

      {songData?.pending?.length != 0 && (
        <>
          <h2 className="text-lg text-white/50 pb-5 pt-20">
            Songs Needed To Approve{" "}
          </h2>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {songData?.pending?.map((song, i) => (
              <div>
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      songRemover(song?._id);
                    }}
                    className="top-0 right-0 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center"
                  >
                    <IoCloseOutline className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => {
                      songApprover(song?._id);
                    }}
                    className="top-0 right-0 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center"
                  >
                    <BsCheck2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                  <SongCard
                    key={song.subtitle}
                    song={song}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={songData.tracks}
                    likeShow={likeShow}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default AdminSongs;
