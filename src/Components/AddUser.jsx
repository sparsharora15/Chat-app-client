import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidderHeader from "./SidderHeader";
import { fetchList, userDetails, sendRequest } from "../../src/Redux/slice";
import decodeToken from "../../services/decoder";
import Loader from "./Loader";

const AddUser = () => {
  const dispatch = useDispatch();
  const {
    data: userListData,
    userData,
    isLoading,
  } = useSelector((state) => state.userList);
  const { socket } = useSelector((state) => state.socket);

  const [userDetail, setUserDetail] = useState([]);
  const [userId, setUserId] = useState("");

  const handleSetIsSent = (_id) => {
    const updatedUserDetail = userDetail.map((element) => {
      if (element._id === _id) {
        return { ...element, isSent: true };
      }
      return element;
    });

    setUserDetail(updatedUserDetail);

    dispatch(sendRequest({ userId, friendId: _id })).catch((err) => {
      console.log(err);
    });

    socket.emit("sendFriendRequest", { userId, friendId: _id,type:"friendReq" });

    // socket.emit("notification", { userId, friendId: _id,type:"friendReq" });
  };

  useEffect(() => {
    decodeToken()
      .then((result) => {
        const userId = result.deCodedToken.payload._id;
        setUserId(userId);

        dispatch(userDetails({ userId }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      const updatedUserListData = userListData?.map((element) => {
        if (!userData?.userDetails?.sentRequestList.includes(element._id)) {
          return { ...element, isSent: false };
        } else {
          return { ...element, isSent: true };
        }
      });

      setUserDetail(updatedUserListData);
    }
  }, [userListData, userData]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchList({ userId: userId }));
    }
  }, [dispatch, userId]);
  return (
    <>
      <div className="w-full md:w-1/3 flex flex-col">
        <SidderHeader />

        <div className="bg-grey-lighter flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-[75vh]">
              <Loader />
            </div>
          ) : (
            userDetail?.map((userDetail, index) => (
              <div
                key={index}
                className="px-3 my-3 flex items-center bg-grey-light cursor-pointer"
              >
                <div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                    alt="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                  />
                </div>
                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                  <div className="flex items-bottom justify-between">
                    <p className="text-grey-darkest">{userDetail.name}</p>
                  </div>
                </div>
                {!userDetail.isSent ? (
                  <button
                    onClick={() => handleSetIsSent(userDetail._id)}
                    className="px-1 py-1 bg-[#449388] justify-center items-center rounded-md text-white outline-none hover:border-none focus:outline-none shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"
                  >
                    <span className="mr-2">Send request</span>
                    <i
                      className="fa-solid fa-user-plus  flex  "
                      style={{ color: "white" }}
                    ></i>
                  </button>
                ) : (
                  <button className="px-1 py-1 bg-[#f0f2f5] justify-center items-center hover:border-none border-none rounded-md text-[#81898d] mx-5 focus:outline-none flex">
                    <span className="mr-2">Request sent</span>
                    <i className="fa-solid fa-check"></i>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AddUser;
