import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import {
  AdminLog,
  AdminOut,
  AdminSearchBar,
  AdminSideBar,
} from "../components/admin";
import { Dashbord, AllUser, Songs } from "../pages/admin/";
import { MusicPlayer } from "../components";
import ErrorPage from '../pages/ErrorPage'


const User = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <AdminSideBar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <AdminSearchBar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/dashbord" element={<Dashbord />} />
              <Route path="/logout" element={<AdminOut />} />
              <Route path="/users" element={<AllUser />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            {/* <TopPlay /> */}
          </div>
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
