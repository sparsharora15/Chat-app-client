import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerString } from "../Redux/slice";
import NotificationWindow from "./NotificationWindow";
import { HiSpeakerphone } from "react-icons/hi";

const SidderHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userList);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationWindowOpen, setNotificationWindowOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  function logout() {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    localStorage.removeItem("userToken");

    navigate("/login");
  }
  return (
    <>
      <div className="py-2 px-3 bg-[#f0f2f5] flex flex-row justify-between items-center">
        <div>
          {user.drawerString !== null ? (
            <i
              className="flex items-center justify-center w-10 h-10 fa-solid fa-arrow-left hover:cursor-pointer hover:rounded-full hover:bg-[#dadddf]"
              style={{ color: "#81898d" }}
              onClick={() => dispatch(setDrawerString(null))}
            ></i>
          ) : (
            <img
              className="w-10 h-10 rounded-full"
              src={
                user?.userData?.userDetails?.profilePicture ||
                "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
              }
              alt="User Avatar"
            />
          )}
        </div>

        <div className="flex hover:cursor-pointer">
          <div
            className="ml-4"
            onClick={() => dispatch(setDrawerString("addUser"))}
          >
            <i
              className="fa-solid fa-user-plus  hover:rounded-full hover:bg-[#dadddf]"
              style={{ color: "#81898d" }}
            ></i>
          </div>
          <div
            className=" relative group ml-4  hover:rounded-full hover:bg-[#dadddf]"
            onClick={() => setNotificationWindowOpen(!isNotificationWindowOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                opacity=".55"
                fill="#263238"
                d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
              ></path>
            </svg>
          </div>
          <div className=" group ml-4 flex items-center justify-center hover:rounded-full hover:bg-[#dadddf]">
            <HiSpeakerphone
              onClick={() => dispatch(setDrawerString("broadcast"))}
              className="text-[#81898d] h-[20px] w-[20px]"
            />
          </div>
          {user.notification.length != 0 ? (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {user.notification.length}
            </span>
          ) : null}
          {isNotificationWindowOpen ? (
            <>
              <NotificationWindow />
            </>
          ) : null}
          <div className="relative group">
            <div
              onClick={toggleMenu}
              className="ml-4  hover:rounded-full hover:bg-[#dadddf]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#263238"
                  fillOpacity=".6"
                  d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                ></path>
              </svg>
            </div>
            <ul
              className={`absolute mt-2 left-[-38px] space-y-2 bg-white border border-gray-300 rounded-lg shadow-lg  py-2 text-sm text-gray-700 dark:text-gray-200 ${
                isMenuOpen ? "" : "hidden"
              }`}
              aria-labelledby="dropdownDelayButton"
            >
              <li
                onClick={() => logout()}
                className="w-[6rem] items-center flex justify-between px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Logout
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ color: "#81898d" }}
                ></i>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-2 px-2 bg-white">
        <input
          type="text"
          className="w-full bg-[#f0f2f5] rounded-lg focus:outline-none px-2 py-2 text-sm"
          placeholder="Search or start new chat"
        />
      </div>
    </>
  );
};

export default SidderHeader;
