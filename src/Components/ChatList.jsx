/* eslint-disable no-unused-vars */
import React from "react";
import SidderList from "./SidderList";
import ChatWindow from "./ChatWindow";
import { useSelector } from "react-redux";
import AddUser from "./AddUser";
import Brodcaster from "../../pages/Brodcaster";

const ChatList = () => {
  const userList = useSelector((state) => state.userList);
  const isMobileView = window.innerWidth <= 767;

  let mainContent = null;
  if (isMobileView && userList.userDetail) {
    mainContent = <ChatWindow />;
  } else if (userList.drawerString === "addUser") {
    mainContent = <AddUser />;
  } else if (userList.drawerString === "broadcast") {
    mainContent = <Brodcaster />;
  } else {
    mainContent = <SidderList />;
  }

  return (
    <div className={` ${isMobileView && "justify-center"} flex rounded shadow-lg h-full w-full`}>
      {mainContent}
      {!isMobileView && userList.drawerString !== "broadcast" && userList.userDetail && (
        <ChatWindow />
      )}
    </div>
  );
};

export default ChatList;
