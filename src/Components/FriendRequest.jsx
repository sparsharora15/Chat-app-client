import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listOfAllFrienReq,
  responseToReq,
  // setNotifiCations,
} from "../Redux/slice";
import Loader from "./Loader";
import moment from "moment";

const FriendRequest = () => {
  //   const currentTime = moment();
  const { socket } = useSelector((state) => state.socket);
  const user = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const handleClick = (e, friendId) => {
    const payload = {
      friendId: friendId,
      userId: user.userId,
      [e.target.name]: e.target.value,
    };
    dispatch(responseToReq(payload));
    if (payload.action === "accept") {
      const payload = {
        userId: friendId,
        title: "Friend request accept",
        description: "Accepted your friend request",
      };
      socket.emit("acceptFriendRequest", payload);
      // dispatch(setNotifiCations(payload));
    }
    //

    //     socket.emit("notification", payload);
  };
  useEffect(() => {
    dispatch(listOfAllFrienReq({ userId: user.userId }));
  }, []);

  return (
    <>
      <div
        className={`${
          window.innerWidth <= "767" ? " ml-[0px] w-[19rem] left-[6px] absolute " : "w-[20rem] ml-[23rem]  "
        } z-10 absolute  bg-white  mt-5 space-y-2 border  py-2  rounded-lg`}
      >
        <ul className="px-2 flex justify-between">
          <li className="	font-bold text-[#449388]">Friend requests</li>
        </ul>
        {user.friendReqs?.friendRequests == 0 ? (
          <div className=" flex justify-center h-full items-center bg-white  w-[20rem] ">
            <p>No friend request found</p>
          </div>
        ) : (
          user.friendReqs?.friendRequests.map((data, i) => {
            return (
              <div key={i}>
                <div className="borderLeft py-1 px-1 bg-grey-lighter  bg-[#e9edef] flex-1 overflow-auto mb-2">
                  <div className=" flex items-center bg-grey-light cursor-pointer">
                    <div>
                      <img
                        className="h-9 w-9 rounded-full"
                        src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                        alt="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                      />
                    </div>
                    <div className="ml-2 flex-1  py-2">
                      <div className="flex items-bottom justify-between">
                        <p className="text-grey-darkest flex">
                          <strong>{data.name}</strong>
                          &nbsp; sent you a friend request
                        </p>
                      </div>
                      <button
                        name="action"
                        value="accept"
                        onClick={(e) => handleClick(e, data._id)}
                        className="hover:bg-[#449388] hover:text-white border rounded-lg py-1 px-1 text-[#449388] w-[6rem]  border-color mr-2 mt-1    "
                      >
                        <i className="fa-solid fa-check mr-2"></i>
                        Accept
                      </button>
                      <button
                        name="action"
                        value="reject"
                        onClick={(e) => handleClick(e, data._id)}
                        className="hover:bg-[#f70d1a] hover:text-white border rounded-lg py-1 px-1 w-[7rem]  border-red-400  text-[red] mt-1   "
                      >
                        <i className="fa-solid fa-xmark mr-2"></i>
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default FriendRequest;
