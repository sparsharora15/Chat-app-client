import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import { setSocket } from "../src/Redux/socketSlice";
import { io } from "socket.io-client";
import decodeToken from "../services/decoder";
import { userDetails } from "../src/Redux/slice";
// import { setNotifiCations } from "../src/Redux/slice";

const Dashboard = () => {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userList);
  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    let newSocket;
    if (user.userId) {
      newSocket = io(import.meta.env.VITE_SOCKET_BASE_URL || "https://chat-app-sockets.onrender.com", {
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
    socket?.on("receiveNewnotification",(res)=>{
    //  dispatch(setNotifiCations(res))
    })
   }, [socket]);
  return (
    <div className="w-full">
      <div className="w-full h-32 bg-[#449388] sticky z-[-10] top-0" ></div>

      <div className="container mx-auto" style={{ marginTop: "-128px" }}>
        <div className="py-6 md:px-10 px-4 h-screen flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
