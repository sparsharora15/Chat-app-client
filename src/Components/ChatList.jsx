import React, { useEffect } from "react";
import SidderList from "./SidderList";
import ChatWindow from "./ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "./AddUser";
const ChatList = () => {
  const userList = useSelector((state) => state.userList);

  return (
    <div
      className={` ${
        window.innerWidth <= "767" && "justify-center"
      } flex rounded shadow-lg h-full w-full`}
    >
      {window.innerWidth <= "767" && userList.userDetail ? (
        <ChatWindow />
      ) : userList.drawerString === "addUser" ? (
        <AddUser />
      ) : (
        <SidderList />
      )}
      {/* {userList.drawerString === "addUser" ? <AddUser /> : <SidderList />} */}

      {window.innerWidth <= "767" ? null : userList.userDetail ===
        null ? null : (
        <ChatWindow />
      )}
    </div>
  );
};

export default ChatList;
