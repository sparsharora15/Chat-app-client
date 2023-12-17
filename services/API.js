import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const getHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const userLogin = async (data) => {
  return await axios.post(`${BASE_URL}users/login`, data);
};

export const registerUser = async (data) => {
  return await axios.post(`${BASE_URL}users/register`, data);
};

export const fetchUsersList = async (userId, token) => {
  const response = await axios.post(`${BASE_URL}users/list`, userId, getHeaders(token));
  return response;
};

export const getConversation = async (senderAndReceiverId, token) => {
  const response = await axios.post(`${BASE_URL}chat/getChats`, senderAndReceiverId, getHeaders(token));
  return response;
};

export const createConversation = async (data, token) => {
  const response = await axios.post(`${BASE_URL}chat/createChat`, data, getHeaders(token));
  return response;
};

export const sendFriendRequest = async (data, token) => {
  const response = await axios.post(`${BASE_URL}users/sendFriendRequest`, data, getHeaders(token));
  return response;
};

export const userData = async (data, token) => {
  const response = await axios.post(`${BASE_URL}users/userDetails`, data, getHeaders(token));
  return response;
};

export const friendReqList = async (data, token) => {
  const response = await axios.post(`${BASE_URL}users/getAllFriendRequests`, data, getHeaders(token));
  return response;
};

export const responseToFriendRequest = async (data, token) => {
  const response = await axios.post(`${BASE_URL}users/handleFriendRequest`, data, getHeaders(token));
  return response;
};

export const friendList = async (data, token) => {
  const response = await axios.post(`${BASE_URL}users/getAllFriendsList`, data, getHeaders(token));
  return response;
};
// export const setNotification = async (data, token) => {
//   const response = await axios.post(`${BASE_URL}users/setUserNotifications`, data, getHeaders(token));
//   return response;
// };
export const getNotification = async (data, token) => {
  const response = await axios.post(`${BASE_URL}users/getNotifications`, data, getHeaders(token));
  return response;
};
export const broadcastMessage = async (data, token) => {
  const response = await axios.post(`${BASE_URL}chat/broadcastMesssage`, data, getHeaders(token));
  return response;
};
export const sendMultimedia = async (data, token) => {
  const response = await axios.post(`${BASE_URL}chat/sendMultimedia`, data, getHeaders(token));
  return response;
};
