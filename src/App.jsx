import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatList from "./Components/ChatList";
import SignUp from "../pages/Auth/SignUp";
import Protected from "../ProtectedRoutes/Protected";
import { setSocket } from "./Redux/socketSlice";
import { io } from "socket.io-client";
import decodeToken from "../services/decoder";
import { getDetail, getUserId } from "./Redux/slice";
import { ToastContainer } from "react-toastify";

function App() {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {

    decodeToken()
    .then((result) => {
      if (result.isDecode) {
        dispatch(getUserId(result.deCodedToken.payload._id))
          // setUserId(._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>

        <Routes>
          <Route path="/" element={<Protected Components={<Dashboard />} />}>
            <Route path="/" element={<Protected Components={<ChatList />} />} />
            {/* <Route path="/" element={<Protected Components={<ChatList />} />} /> */}
            <Route
              path="/login"
              element={<Protected Components={<Login />}></Protected>}
            />
            <Route path="/register" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
