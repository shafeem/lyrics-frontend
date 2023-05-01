import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  // const artist = artistData?.artists[artistId]?.attributes;

  console.log(
    artistData,
    "this is the artist data from detailHeader component"
  );

  console.log(songData, "this is the songdata from detailHeader");

  return (
    <div className="relative w-full flex flex-col ">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          src={
            // artistId
            //   ? artist.artwork?.url.replace("{w}", "500").replace("{h}", "500")
            //   : songData?.images?.coverart
            artistData?.imgUrl
          }
          className="w-36  h-36 rounded-full object-cover border-2 shadow-xl shadow-black"
          alt="art"
        />
        {/* <div className="ml-5">
        <p className='font-bold sm:text-xl text-lg text-white'>{artistId ? artist?.name :songData?.title}</p>
        {!artistData && (
          <Link to={`/artists/${songData?.artists[0].adamid}`}>
            <p className='text-base text-gray-400 mt-2 '>
              {songData?.subtitle}
            </p>
          </Link>
        )}
        <p className='text-base text-gray-400 mt-2'>
          {artistId ? artist ?.genreNames[0] : songData?.genres?.primary}
        </p>
      </div> */}
        <div className="ml-5">
          <p className="font-bold sm:text-xl text-lg text-white">
            {/* {artistId ? artist?.name : songData?.title} */}
            {artistData?.name}
          </p>
          {/* {!artistData && songData?.artists && (
            <Link to={`/artists/${songData.artists[0]?.adamid}`}>
              <p className="text-base text-gray-400 mt-2 ">
                {songData.subtitle}
              </p>
            </Link>
          )} */}
          {/* <p className="text-base text-gray-400 mt-2">
            {artistId ? artist?.genreNames?.[0] : songData?.genres?.primary}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
