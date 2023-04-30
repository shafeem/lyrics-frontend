import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
// import {
//   useGetSpecificSongsQuery,
//   useGetTracksQuery,
// } from "../redux/services/shazam";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useEffect, useState } from "react";
import axios from "../axios/userInstance";


const Discover = () => {
  const [data, setData] = useState();
  const [songData,setSongData] = useState();
  const [songGenre, setSongGenre] = useState("POP");

  var genreTitle;

  console.log(songGenre, "the song genre");

  useEffect(() => {
    axios({
      url: "/songFinder",
      method: "GET",
    }).then((res) => {
      console.log(res.data, "the res.data here");
      setData(res.data.tracks);
      setSongData(res.data)
    });
  }, []);

  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  // const { data, isFetching, error } = useGetTracksQuery();

  // const {
  //   data: searchData,
  //   isFetching: isSearchFetching,
  //   error: searchError,
  // } = useGetSpecificSongsQuery(genreListId || "POP");

  // if (isFetching || isSearchFetching)
  //   return <Loader title="Loading Songs..." />;

  // if (error || searchError) return <Error />;

  genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  const filteredSongs = songData?.tracks?.filter(
    (music) => music.genre == songGenre
  );
  console.log(filteredSongs,'the filtered songs')

  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h3 className="font-bold text-xl text-white text-left">
          {genreTitle || "Pop"}{" "}
        </h3>
        <select
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
            setSongGenre(e.target.value);
          }}
          value={genreListId || "Pop"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 "
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {" "}
              {genre.title}{" "}
            </option>
          ))}
        </select>
      </div>

      <div className=" flex flex-wrap sm:justify-start justify-center gap-8">
        {filteredSongs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={filteredSongs}
            i={i}
          />
        ))}
      </div>
      <h2 className="font-bold text-3xl text-white text-center mb-8">
        Discover
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songData?.tracks?.map((song, i) => (
          <div>
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
};

export default Discover;
