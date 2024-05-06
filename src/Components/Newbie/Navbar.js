import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../Hooks/index";
import { GiNinjaHeroicStance } from "react-icons/gi";
import { GiNinjaHead } from "react-icons/gi";
import { SiCodersrank } from "react-icons/si";
import { userDetails} from "../../Api/Developer"

export default function Navbar() {
  const { handleLogout } = useAuth();
  const [userInfo, setUserInfo] = useState({title:"users"})
  useEffect(() => { 
  getUser()
  }, [])
  async function getUser() { 
  const {error,data} = await userDetails()
  setUserInfo(data)
  };
  return (
    <nav className="w-48 min-h-screen bg-blue-950 border-r dark:border-gray-400 border-pink-400">
      <div className="flex flex-col justify-between pl-5 h-screen sticky top-0">
        <ul>
          <li className="mb-8">
            <Link to="/">
              <img src="https://res.cloudinary.com/demjvtd9v/image/upload/v1709388316/user/newPICS_gbq6bs.png" alt="logo" className="h-16 p-2 ml-7" />
            </Link>
          </li>
          <li>
            <NavItem to="/">
              <SiCodersrank />
              <span>TaskPage</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/HiringManger">
              <GiNinjaHeroicStance />
              <span>HiringManger</span>
            </NavItem>
          </li>
          <li>
            <NavItem to="/Developer">
              <FaUserNinja />
              <span>Developers</span>
            </NavItem>
            </li> 
          <li>
            <NavItem to="/practiceGround">
              <GiNinjaHead />
              <span>PlayGround</span>
            </NavItem>
          </li>
        </ul>
        <div className="flex flex-col items-start pb-5">
          <span className="font-semibold text-orange-400 text-lg font-serif">{(userInfo?.title)}</span>
          <button
            onClick={handleLogout}
            className="flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1"
          >
            <FiLogOut />
            <span >SignOut</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ children, to }) => {
  const commonClasses =
    " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
  return (
    <NavLink
      className={({ isActive }) =>
        (isActive ? "text-white font-serif" : "text-gray-400") + commonClasses
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};



