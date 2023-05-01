import { useParams } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazam";
import axios from '../axios/userInstance'
import { useEffect, useState } from "react";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const [data,setData] = useState();
  const [artist,setArtist] = useState();

  // const {
  //   data: artistData,
  //   isFetching: isFetchingArtistDetails,
  //   error,
  // } = useGetArtistDetailsQuery(artistId);

  // if (isFetchingArtistDetails) return <Loader title="Loading Artist Details" />;

  // if (error) return <Error />;

  useEffect(()=>{
    axios({
      url:"/findArtistSongs",
      method:"POST",
      data:{
        artistId
      }
    }).then((res)=>{
      setData(res?.data?.tracks)
      setArtist(res?.data?.artist)

    })
  },[])



  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artist} />

      <RelatedSongs
        // data={Object.values(artistData?.data)}
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
