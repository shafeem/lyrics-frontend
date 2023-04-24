import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  Searchbar,
  Sidebar,
  MusicPlayer,
  TopPlay,
  Logout,
} from "../components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  SongDetails,
  TopCharts,
  Profile,
  AddSongs,
  UserCreatePlaylist
} from "../pages";
import Playlist from "../pages/Playlist";

const User = () => {
  const { activeSong } = useSelector((state) => state.player);

  const location = useLocation();

  const isProfilePage = location.pathname === "/profile" || "/add-songs";

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/createPlaylist" element={<UserCreatePlaylist />} />
              <Route path="/playlist/:id" element={<Playlist/>} />
              <Route path="/add-songs" element={<AddSongs/>} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>

          {/* {!isProfilePage && (
            <div className="xl:sticky relative top-0 h-fit">
              <TopPlay />
            </div>
          )} */}
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default User;
