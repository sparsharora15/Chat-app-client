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
        console.log("Received new friend request:", friendRequest);
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
        console.log("accepted a friend req", friendRequest);
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

        <div className="bg-grey-lighter flex-1 overflow-auto">
          {userList?.isLoading ? (
            <div className="flex justify-center items-center h-[75vh]">
              <Loader />
            </div>
          ) : (
            <>
              {userList?.allFriendsList.length === 0 ? (
                <div className="flex h-[75vh] items-center justify-center">
                  No chat found
                </div>
              ) : (
                userList?.allFriendsList.map((userDetail, index) => (
                  <div
                    key={index}
                    onClick={() => handleUserClick(index, userDetail)}
                    className={`${
                      activeIndex === index
                        ? "bg-[#e9edef]"
                        : "hover:bg-[#e9edef]"
                    } px-3 flex items-center bg-grey-light cursor-pointer`}
                  >
                    <div>
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                        alt="User Avatar"
                      />
                    </div>
                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                      <div className="flex items-bottom justify-between">
                        <p className="text-grey-darkest">{userDetail.name}</p>
                        <p className="text-xs text-grey-darkest">12:45 pm</p>
                      </div>
                      <p className="text-grey-dark mt-1 text-sm">
                        Tap to chat
                      </p>
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
