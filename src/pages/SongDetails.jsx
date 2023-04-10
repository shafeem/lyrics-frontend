import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
} from "../redux/services/shazam";

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid);
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetRelatedSongsQuery(songid);

  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const handlePause = () => {
    dispatch(playPause(false));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title="Searching Song Details" />;

  if (error) return <Error />;


  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-lg font-bold ">Lyrics:</h2>

        {/* <div className="mt-5">
          {songData?.sections[1]?.type === "LYRICS" ? (
            songData?.sections[1]?.text?.map((line, i) => (
              <p className="text-gray-400 text-base">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base">Sorry No Lyrics Found !</p>
          )}
        </div> */}
        <div className="mt-5">
          {songData &&
          songData.sections &&
          songData.sections[1]?.type === "LYRICS" ? (
            songData.sections[1].text?.map((line, i) => (
              <p className="text-gray-400 text-base">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base">Sorry No Lyrics Found !</p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  );
};

export default SongDetails;
