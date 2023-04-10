import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logo } from "../assets";
import { Loginlinks,LogoutLinks } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";
import { useSelector } from "react-redux";

const NavLinks = (handleClick) => {
  const { token } = useSelector((state) => state.userSlice);

return (
  <>
    <div className="mt-10 ">
      {token
        ? LogoutLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
              onClick={() => handleClick && handleClick()}
            >
              <item.icon className="w-6 h-6 mr-2" />
              {item.name}
            </NavLink>
          ))
        : Loginlinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
              onClick={() => handleClick && handleClick()}
            >
              <item.icon className="w-6 h-6 mr-2" />
              {item.name}
            </NavLink>
          ))}
    </div>
  </>
);
};

const Sidebar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624] ">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />

        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenu ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-1/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenu ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenu(false)} />
      </div>
    </>
  );
};
export default Sidebar;
