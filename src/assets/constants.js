import { HiOutlineUserGroup } from "react-icons/hi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AiOutlineHome, AiOutlineBarChart } from "react-icons/Ai";
import { CgProfile } from "react-icons/cg";
import {BsMusicNote} from 'react-icons/bs'
import {MdPlaylistAdd} from 'react-icons/md'
import {IoMdAddCircleOutline} from 'react-icons/io'

export const genres = [
  { title: "Pop", value: "POP" },
  { title: "Hip-Hop", value: "HIP_HOP_RAP" },
  { title: "Dance", value: "DANCE" },
  { title: "Electronic", value: "ELECTRONIC" },
  { title: "Soul", value: "SOUL_RNB" },
  { title: "Alternative", value: "ALTERNATIVE" },
  { title: "Rock", value: "ROCK" },
  { title: "Latin", value: "LATIN" },
  { title: "Film", value: "FILM_TV" },
  { title: "Country", value: "COUNTRY" },
  { title: "Worldwide", value: "WORLDWIDE" },
  { title: "Reggae", value: "REGGAE_DANCE_HALL" },
  { title: "House", value: "HOUSE" },
  { title: "K-Pop", value: "K_POP" },
];

export const Loginlinks = [
  { name: "Discover", to: "/", icon: AiOutlineHome },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: AiOutlineBarChart },
  { name: "Login", to: "/login", icon: FiLogIn },
];

export const LogoutLinks = [
  { name: "Discover", to: "/", icon: AiOutlineHome },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: AiOutlineBarChart },
  { name: "Profile", to: "/profile", icon: CgProfile },
  { name: "Logout", to: "/logout", icon: FiLogOut },
];
export const ArtistLinks = [
  { name: "Discover", to: "/", icon: AiOutlineHome },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  {name:"Add Songs",to:"/add-songs", icon:IoMdAddCircleOutline},
  { name: "Top Charts", to: "/top-charts", icon: AiOutlineBarChart },
  { name: "Profile", to: "/profile", icon: CgProfile },
  { name: "Logout", to: "/logout", icon: FiLogOut },
];

export const Admins = [
  { name: "Dashbord", to: "/admin/dashbord", icon: AiOutlineHome },
  { name: "Users", to: "/admin/users", icon: CgProfile },
  { name: "Songs", to: "/admin/songs", icon: BsMusicNote },
  { name: "Create PlayList", to: "/admin/playlist", icon: MdPlaylistAdd },
  { name: "Logout", to: "/admin/logout", icon: FiLogOut },
];
