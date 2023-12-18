/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidderHeader from "./SidderHeader";
import { fetchList, getDetail, getFriendsList } from "../../src/Redux/slice";
import decodeToken from "../../services/decoder";
import Loader from "./Loader";
const SidderList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { socket } = useSelector((state) => state.socket);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriendsList = userList.allFriendsList.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    decodeToken()
      .then((result) => {
        dispatch(getFriendsList({ userId: result.deCodedToken.payload._id }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveNewFriendRequest", (friendRequest) => {
        // Handle the incoming friend request
        // dispatch(setNotifiCations({ friendRequest }));
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveNewFriendRequest");
      }
    };
  }, [dispatch, socket]);
  useEffect(() => {
    if (socket) {
      socket.on("friendRequestAccepted", (friendRequest) => {
        // Handle the incoming friend request
        // dispatch(setNotifiCations({ friendRequest }));
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveNewFriendRequest");
      }
    };
  }, [dispatch, socket]);

  function getDetailOfAUser(detail) {
    dispatch(getDetail(detail));
  }

  function handleUserClick(index, userDetail) {
    setActiveIndex(index);
    getDetailOfAUser(userDetail);
  }

  return (
    <>
      <div className="w-full md:w-1/3 flex flex-col">
        <SidderHeader />
        <div className="py-2 px-2 bg-white">
          <input
            type="text"
            className="w-full bg-[#f0f2f5] rounded-lg focus:outline-none px-2 py-2 text-sm"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="bg-grey-lighter flex-1 overflow-auto">
          {userList?.isLoading ? (
            <div className="flex justify-center items-center h-[75vh]">
              <Loader />
            </div>
          ) : (
            <>
              {filteredFriendsList.length === 0 ? (
                <div className="flex h-[75vh] items-center justify-center">
                  No chat found
                </div>
              ) : (
                filteredFriendsList.map((userDetail, index) => (
                  <div
                    key={index}
                    onClick={() => handleUserClick(index, userDetail)}
                    className={`${
                      activeIndex === index
                        ? "bg-[#e9edef]"
                        : "hover:bg-[#e9edef]"
                    } px-3 flex items-center bg-grey-light cursor-pointer`}
                  >
                    <div className=" h-12 flex items-center w-12 justify-center border rounded-[40px]">
                      <img
                        className="h-[90%]  "
                        src={userDetail?.profilePicture || "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"}
                        alt="User Avatar"
                      />
                    </div>
                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                      <div className="flex items-bottom justify-between">
                        <p className="text-grey-darkest">{userDetail.name}</p>
                        {/* <p className="text-xs text-grey-darkest">12:45 pm</p> */}
                      </div>
                      <p className="text-grey-dark mt-1 text-sm">Tap to chat</p>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SidderList;
