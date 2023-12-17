/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidderHeader from "../src/Components/SidderHeader";
import sendIcon from "../src/assets/send.svg";
import { useSelector } from "react-redux";
import { broadcastMessage } from "../services/API";
import { sendMessageToMany } from "../src/Redux/slice";
import { useDispatch } from "react-redux";
const Brodcaster = () => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [broadcastData, setBroadcastData] = useState({
    message: "",
  });

  const handleCheckboxChange = (userId, isChecked) => {
    setSelectedUserIds((prevIds) =>
      isChecked ? [...prevIds, userId] : prevIds.filter((id) => id !== userId)
    );
  };

  const handleSendMessage = async () => {
    // setBroadcastData({

    // });
   const payload = {
      sender: userList?.userData?.userDetails?._id,
      text: broadcastData.message,
      receivers: selectedUserIds,
    }

    const res  = await dispatch( sendMessageToMany(payload))
    console.log(res)
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
          <button className="hover:cursor-pointer" onClick={handleSendMessage}>
            <img src={sendIcon} alt="" />
          </button>
        </div>
        {userList?.allFriendsList?.map((userDetail, index) => (
          <div
            key={index}
            className="px-3 my-3 flex items-center bg-grey-light cursor-pointer"
          >
            <div>
              <input
                className="mr-2"
                type="checkbox"
                style={{ width: "25px", height: "25px" }}
                onChange={(e) =>
                  handleCheckboxChange(userDetail._id, e.target.checked)
                }
              />
            </div>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Brodcaster;
