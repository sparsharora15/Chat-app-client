import React, { useState, useRef, useEffect } from "react";
import ChatWindowHeader from "./ChatWindowHeader";
import moment from "moment";
import sendIcon from "../assets/send.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  createChat,
  getConversationBetweenTwoUser,
  removeTypingUser,
  setChat,
  typingUsers,
} from "../Redux/slice";
import decodeToken from "../../services/decoder";
const ChatWindow = () => {
  const scroll = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userList);
  const socket = useSelector((state) => state.socket);
  const [senderId, setSenderId] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const typingTimeout = useRef(null);

  const handleOnChange = (e) => {
    setSendMessage(e.target.value);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      
      if (e.target.value) {
        setIsTyping(true);
        socket.socket.emit("startTyping", {
          typingStatusReceiver: user.userDetail._id,
          senderId: senderId
        });
      } else {
        setIsTyping(false);
        socket.socket.emit("stopTyping", {
          typingStatusReceiver: user?.userDetail?._id,
          senderId: senderId
        });
        socket.socket.on("userStoppedTyping", (res) => {
          dispatch(removeTypingUser(res));
        });

      }
    }, 1000);
  };

  const handleOnClick = () => {
    dispatch(
      createChat({
        receiverId: user.userDetail._id,
        senderId: senderId,
        message: sendMessage,
      })
    );
    const currentTime = moment();
    dispatch(
      setChat({
        receiver: user.userDetail._id,
        sender: senderId,
        text: sendMessage,
        createdAt: currentTime,
      })
    );
    socket.socket.emit("sendMessage", {
      receiver: user.userDetail._id,
      sender: senderId,
      text: sendMessage,
      createdAt: currentTime,
      socketId: socket.socket.id,
    });
    setSendMessage("");
  };
  useEffect(() => {
    decodeToken()
      .then((result) => {
        setSenderId(result.deCodedToken.payload._id);
        dispatch(
          getConversationBetweenTwoUser({
            senderId: result.deCodedToken.payload._id,
            receiverId: user.userDetail._id,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.userDetail._id]);
  useEffect(() => {
    socket.socket.on("receiveNewMessage", (res) => {
      dispatch(setChat(res));
    });
  }, []);

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [user.chats]);
  useEffect(() => {
    try {
      socket.socket.on("userTyping", (res) => {
        dispatch(typingUsers(res));
      });
    } catch (error) {
      console.error("Error in event listener:", error);
    }
  }, []);
  return (
    <div className="w-2/3 border flex flex-col">
      <ChatWindowHeader isTyping={isTyping} />

      <div className="flex-1 overflow-auto bg-[#DAD3CC]">
        <div className="py-2 px-3">
          <div className="flex justify-center mb-2">
            <div className="rounded py-2 px-4 bg-[#DDECF2]">
              <p className="text-sm uppercase">February 20, 2018</p>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="rounded py-2 px-4 bg-[#FCF4CB]">
              <p className="text-xs">
                Messages to this chat and calls are now secured with end-to-end
                encryption. Tap for more info.
              </p>
            </div>
          </div>
          {user.chats.map((message, i) => {
            const formattedTime = moment(message.createdAt).format("h:mm A");
            return (
              <div
                key={i}
                ref={scroll}
                className={`${
                  senderId === message.sender
                    ? "flex justify-end mb-2"
                    : "flex mb-2"
                }`}
              >
                <div
                  className={`${
                    senderId === message.sender
                      ? "rounded py-2 px-3 bg-[#d9fdd3]"
                      : "rounded py-2 px-3 bg-[#fff]"
                  }`}
                >
                  <p className="text-sm mt-1">{message.text}</p>
                  <p className="text-right text-xs text-grey-dark mt-1">
                    {formattedTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#f0f2f5] px-4 py-4 flex items-center">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              opacity=".45"
              fill="#263238"
              d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
            ></path>
          </svg>
        </div>
        <div className="flex-1 mx-4">
          <input
            className="w-full focus:outline-none border rounded-lg px-2 py-2"
            type="text"
            value={sendMessage}
            onChange={(e) => handleOnChange(e)}
            // onChange={handleOnChange}
            placeholder="Type a message"
          />
        </div>
        <div className="hover:cursor-pointer" onClick={() => handleOnClick()}>
          <img src={sendIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
