import React, { useEffect } from "react";
import SidderList from "./SidderList";
import ChatWindow from "./ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "./AddUser";
const ChatList = () => {
  const userList = useSelector((state) => state.userList);

  return (
    <div className="flex rounded shadow-lg h-full w-full">
      {userList.drawerString === "addUser" ? <AddUser/> : <SidderList />}
      {/* <SidderList /> */}
      
      {userList.userDetail === null ? null : <ChatWindow />}
    </div>
  );
};

export default ChatList;
