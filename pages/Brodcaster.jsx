/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidderHeader from "../src/Components/SidderHeader";
import sendIcon from "../src/assets/send.svg";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../src/Components/Loader";
import { sendMessageToMany } from "../src/Redux/slice";
import { useDispatch } from "react-redux";

const Brodcaster = () => {
  const user = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFriendsList = user.allFriendsList.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [broadcastData, setBroadcastData] = useState({
    message: "",
  });

  const handleCheckboxChange = (userId, isChecked) => {
    setSelectedUserIds((prevIds) =>
      isChecked ? [...prevIds, userId] : prevIds.filter((id) => id !== userId)
    );
  };

  const handleSendMessage = async () => {
    const showErrorToast = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    if (selectedUserIds.length === 0) {
      showErrorToast("Please select at least one user.");
      return;
    }

    const trimmedMessage = broadcastData.message.trim();
    if (trimmedMessage === "") {
      showErrorToast("Please enter a non-empty message.");
      return;
    }

    const payload = {
      sender: userList?.userData?.userDetails?._id,
      text: trimmedMessage,
      receivers: selectedUserIds,
    };

    setIsLoading(true);
    const res = await dispatch(sendMessageToMany(payload));

    const successMessage = "Messages broadcasted successfully";
    if (res?.payload.message === successMessage) {
      toast.success(successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setIsLoading(false);
    setSelectedUserIds([]);
    setBroadcastData({
      message: "",
    });
  };

  const handleMessageChange = (e) => {
    setBroadcastData({
      ...broadcastData,
      message: e.target.value,
    });
  };

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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="flex h-[60vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchQuery === "" ? (
              userList?.allFriendsList?.map((userDetail, index) => (
                <div
                  key={index}
                  className="px-3 my-3 flex items-center bg-grey-light cursor-pointer"
                >
                  <div className="flex items-center jusstify-center">
                    <input
                      className="mr-2"
                      type="checkbox"
                      style={{ width: "20px", height: "20px" }}
                      onChange={(e) =>
                        handleCheckboxChange(userDetail._id, e.target.checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-center border rounded-[40px] bg-[#f0f2f5] h-[40px] w-[40px]">
                    <img
                      className=" h-[90%] "
                      src={
                        userDetail?.profilePicture ||
                        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                    <div className="flex items-bottom justify-between">
                      <p className="text-grey-darkest">{userDetail.name}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredFriendsList.map((userDetail, index) => (
                <div
                  key={index}
                  className="px-3 my-3 flex items-center bg-grey-light cursor-pointer"
                >
                  <div className="flex items-center jusstify-center">
                    <input
                      className="mr-2"
                      type="checkbox"
                      style={{ width: "20px", height: "20px" }}
                      onChange={(e) =>
                        handleCheckboxChange(userDetail._id, e.target.checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-center border rounded-[40px] bg-[#f0f2f5] h-[40px] w-[40px]">
                    <img
                      className=" h-[90%] "
                      src={
                        userDetail?.profilePicture ||
                        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                    <div className="flex items-bottom justify-between">
                      <p className="text-grey-darkest">{userDetail.name}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="flex items-center sticky bottom-0">
              <div className="py-2 px-2 bg-white w-full">
                <input
                  type="text"
                  className="w-full bg-[#f0f2f5] rounded-lg focus:outline-none px-2 py-2 text-sm"
                  placeholder="Send message"
                  value={broadcastData.message}
                  onChange={handleMessageChange}
                />
              </div>
              <button
                className="hover:cursor-pointer"
                onClick={handleSendMessage}
              >
                <img src={sendIcon} alt="" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Brodcaster;
