import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RiNotification2Fill } from "react-icons/ri";
import Notification from "./Notification";


const Searchbar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const Message = "New Feature Available Now.You Can Upload Your Own Songs";

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${search}`);
  };

  return (
    <div className="flex w-full px-4">
      <div className="w-10/12">
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
      <div className="flex-none ml-4 sm:pr-10 sm:pt-6 pt-3">
        <div className="">
          <RiNotification2Fill
            className="w-6 h-6 text-white/90"
            onClick={handleClick}
          />
        </div>
      </div>

      {isOpen && (
        
          <Notification handleClick={handleClick} children={Message} isOpen={isOpen}/>
        
      )}
    </div>
  );
};

export default Searchbar;
