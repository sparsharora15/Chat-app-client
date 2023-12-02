import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotifiCations,
  listOfAllFrienReq,
  responseToReq,
} from "../Redux/slice";
import Loader from "./Loader";
import moment from "moment";
import FriendRequest from "./FriendRequest";
const NotificationWindow = () => {
  const currentTime = moment();
  const [isFriendRequest, setIsFriendRequest] = useState(false);
  const { socket } = useSelector((state) => state.socket);
  const user = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  // const handleClick = (e, friendId) => {
  //   const payload = {
  //     friendId: friendId,
  //     userId: user.userId,
  //     [e.target.name]: e.target.value,
  //   };

  //   dispatch(responseToReq(payload));
  // };

  useEffect(() => {
    dispatch(listOfAllFrienReq({ userId: user.userId }));
  }, []);
  useEffect(() => {
    dispatch(getNotifiCations({ userId: user.userId }));
  }, []);

  return (
    <>
    <div className="z-10 absolute bg-white mt-5 space-y-2 border w-[23rem] py-2 rounded-lg">
      <ul className="px-2 flex justify-between">
        <li className="font-bold text-[#449388]">Notifications</li>
        <li
          className="underline text-[#449388]"
          onClick={() => setIsFriendRequest(!isFriendRequest)}
        >
          Friend requests
        </li>
      </ul>
      {user.isNotificationsLoading ? (
        <div className="z-10 absolute h-[40vh] flex justify-center items-center bg-white mt-5 space-y-2 border w-[23rem] py-2 rounded-lg">
          <Loader />
        </div>
      ) : (
        <>
          {user?.notification.length === 0 ? (
            <div className="flex justify-center h-full items-center bg-white w-[23rem]">
              <p>No new notifications found</p>
            </div>
          ) : (
            user?.notification?.map((notification) => {
              let name = notification?.description.split("accepted")[0];
              let remainingText = notification?.description.split(" ");
              console.log(remainingText);
              return (
                <div key={notification._id}>
                  <div className="borderLeft py-1 px-1 bg-grey-lighter bg-[#e9edef] flex-1 overflow-auto mb-2">
                    <div className="flex items-center bg-grey-light cursor-pointer">
                      <div>
                        <img
                          className="h-9 w-9 rounded-full"
                          src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                          alt="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                        />
                      </div>
                      <div className="ml-2 flex-1 py-2">
                        <div className="flex items-bottom justify-between">
                          <p className="text-grey-darkest flex">
                            <strong>{name}</strong>
                            &nbsp;
                            {notification.title === "Friend Request Accepted"
                              ? "accepted your friend request"
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })
          )}
          {user?.notification.length !== 0 ? (
            <div className="w-full justify-center items-center flex">
              <button className="px-1 py-1 bg-[#449388] rounded-md text-white outline-none hover:border-none focus:outline-none shadow-lg transform active:scale-x-75 transition-transform mx-5 flex">
                <span>Mark as read</span>
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  
    {isFriendRequest ? <FriendRequest /> : null}
  </>
  
  );
};

export default NotificationWindow;
