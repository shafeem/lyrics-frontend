import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RiNotification2Fill } from "react-icons/ri";
import Notification from "./Notification";
import { IoSettingsSharp } from "react-icons/io5";
import Setting from "./Setting";
import { useSelector } from "react-redux";

const Searchbar = () => {
  const navigate = useNavigate();

  const {token} =useSelector((state)=>state.userSlice);

  const [search, setSearch] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isSetting, isSettingOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const settingHandler = () => {
    isSettingOpen(!isSetting);
  };

  const Message = "New Feature Available Now.You Can Upload Your Own Songs";

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${search}`);
  };

  return (
    <div className="flex w-full px-4">
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="p-2 text-gray-400 fo cus-within:text-gray-600"
        >
          <label htmlFor="search-field" className="sr-only">
            Search All Songs
          </label>
          <div className="flex flex-row justify-start items-center">
            <FiSearch className="w-5 h-5 ml-4" />
            <input
              type="search"
              name="search-field"
              autoComplete="off"
              id="search-field"
              className="flex-1 bg-transparent border-none placeholder-gray-500 text-base text-white p-4"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </form>
      </div>
      <div className="flex-none mr-10 pt-6">
        {token && (
          <RiNotification2Fill
          className="w-5 h-5 text-white/90 hover:cursor-pointer"
          onClick={handleClick}
        />
        )}
      </div>
      <div className="flex-none mr-10 pt-6">
        {token && (
          <IoSettingsSharp
          className="w-5 h-5 text-white hover:cursor-pointer"
          onClick={settingHandler}
        />
        )}
      </div>

      {token && isOpen && (
        <Notification
          name={'Notifications'}
          handleClick={handleClick}
          children={Message}
          isOpen={isOpen}
        />
      )}
      {token && isSetting && (
        <Notification
          name={'Settings'}
          handleClick={settingHandler}
          children={<Setting />}
          isOpen={isSetting}
        />
      )}
    </div>
  );
};

export default Searchbar;
