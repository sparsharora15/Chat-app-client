import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import { setSocket } from "../src/Redux/socketSlice";
import { io } from "socket.io-client";
import decodeToken from "../services/decoder";
// import { setNotifiCations } from "../src/Redux/slice";

const Dashboard = () => {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userList);
  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    let newSocket;
    if (user.userId) {
      newSocket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
        query: {
          userId: user.userId,
        },
      });
      dispatch(setSocket(newSocket));
    } 

    if (newSocket) {
      return () => {
        newSocket.disconnect();
      };
    }
  }, [dispatch, user.userId]);
  useEffect(() => {
    socket?.on("receiveNewnotification",(res)=>{
    //  dispatch(setNotifiCations(res))
    })
   }, [socket]);
  return (
    <div className="w-full">
      <div className="w-full h-32 bg-[#449388]" ></div>

      <div className="container mx-auto" style={{ marginTop: "-128px" }}>
        <div className="py-6 px-10 h-screen flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
