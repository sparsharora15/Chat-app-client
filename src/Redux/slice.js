/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createConversation,
  fetchUsersList,
  friendReqList,
  getConversation,
  registerUser,
  sendFriendRequest,
  userData,
  responseToFriendRequest,
  friendList,
  getNotification,
  broadcastMessage,
} from "../../services/API";

export const fetchList = createAsyncThunk("fetchList", async (userId) => {
  const response = await fetchUsersList(
    userId,
    localStorage.getItem("userToken")
  );
  return response.data;
});
export const register = createAsyncThunk("register", async (details) => {
  const response = await registerUser(details);
  return response.data;
});
export const getConversationBetweenTwoUser = createAsyncThunk(
  "getChat",
  async (ids) => {
    const response = await getConversation(
      ids,
      localStorage.getItem("userToken")
    );
    return response.data;
  }
);
export const createChat = createAsyncThunk("createChat", async (data) => {
  const response = await createConversation(
    data,
    localStorage.getItem("userToken")
  );
  return response.data.userDetails;
});
export const getDetail = createAsyncThunk("detail", async (detail) => {
  return detail;
});
export const setUserDetailsNull = createAsyncThunk(
  "setUserdetail",
  async (detail) => {
    return detail;
  }
);
export const getUserId = createAsyncThunk("userId", async (id) => {
  return id;
});
export const setChat = createAsyncThunk("setActiveChats", async (data) => {
  return data;
});
export const typingUsers = createAsyncThunk("typingUsers", async (users) => {
  return users;
});
// export const setNotifiCations = createAsyncThunk(
//   "setNotifiCations",
//   async (data) => {
//     const response = await setNotification(
//       data,
//       localStorage.getItem("userToken")
//     );
//     return response.data
//   }
// );
export const getNotifiCations = createAsyncThunk(
  "getNotifiCations",
  async (userId) => {
    const response = await getNotification(
      userId,
      localStorage.getItem("userToken")
    );
    return response.data.userNotifications;
  }
);
export const removeTypingUser = createAsyncThunk(
  "removeTypingUser",
  async (users) => {
    return users;
  }
);
export const setDrawerString = createAsyncThunk(
  "setDrawerString",
  async (string) => {
    return string;
  }
);
export const sendRequest = createAsyncThunk("sendRequest", async (data) => {
  const response = await sendFriendRequest(
    data,
    localStorage.getItem("userToken")
  );
  return response.data;
});
export const userDetails = createAsyncThunk("userDetails", async (data) => {
  const response = await userData(data, localStorage.getItem("userToken"));
  return response.data;
});
export const listOfAllFrienReq = createAsyncThunk(
  "listOfAllFrienReq",
  async (data) => {
    const response = await friendReqList(
      data,
      localStorage.getItem("userToken")
    );

    return response.data;
  }
);
export const responseToReq = createAsyncThunk("responseToReq", async (data) => {
  const response = await responseToFriendRequest(
    data,
    localStorage.getItem("userToken")
  );
  return response.data;
});
export const getFriendsList = createAsyncThunk(
  "getFriendsList",
  async (data) => {
    const response = await friendList(data, localStorage.getItem("userToken"));
    return response.data;
  }
);
export const sendMessageToMany = createAsyncThunk(
  "sendMessageToMany",
  async (data) => {
    const response = await broadcastMessage(
      data,
      localStorage.getItem("userToken")
    );
    return response.data;
  }
);

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    message: "",
    error: "",
    drawerString: null,
    userDetail: null,
    userId: null,
    chats: [],
    notification: [],
    allFriendsList: [],
    userData: null,
    friendReqs: null,
    usersTyping: [],
    isNotificationsLoading: false,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchList.fulfilled, (state, action) => {
        state.isLoading = false;
        action.payload?.forEach((element) => {
          element["isSent"] = false;
        });
        state.data = action.payload;

        state.isError = false;
      })

      .addCase(fetchList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "something went wrong";
      })

      .addCase(getConversationBetweenTwoUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
        state.isError = false;
      })
      .addCase(getConversationBetweenTwoUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "something went wrong";
        state.chats = [];
      })

      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false;
        // state.isError = true;
        state.message = "something went wrong";
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        state.userDetail = action.payload;
      })
      .addCase(getUserId.fulfilled, (state, action) => {
        state.userId = action.payload;
      })
      .addCase(setChat.fulfilled, (state, action) => {
        state.chats = [...state.chats, action.payload];
      })
      .addCase(typingUsers.fulfilled, (state, action) => {
        state.usersTyping = [...state.usersTyping, action.payload];
      })
      .addCase(removeTypingUser.fulfilled, (state, action) => {
        state.usersTyping = state.usersTyping.filter(
          (el) => el !== action.payload
        );
      })
      .addCase(setDrawerString.fulfilled, (state, action) => {
        state.drawerString = action.payload;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })

      .addCase(sendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(userDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userData = action.payload;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userData = action.payload;
      })
      .addCase(listOfAllFrienReq.fulfilled, (state, action) => {
        state.isNotificationsLoading = false;
        state.isError = false;
        state.friendReqs = action.payload;
      })

      .addCase(listOfAllFrienReq.rejected, (state, action) => {
        state.isNotificationsLoading = false;
        state.isError = true;
      })

      .addCase(responseToReq.fulfilled, (state, action) => {
        state.isNotificationsLoading = false;
        state.isError = false;
      })
      .addCase(responseToReq.rejected, (state, action) => {
        state.isNotificationsLoading = false;
        state.isError = true;
      })
      .addCase(getFriendsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getFriendsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.allFriendsList = action.payload;
      })
      // .addCase(setNotifiCations.fulfilled, (state, action) => {
      //   // state.notification = [...state.notification, action.payload];
      //   state.isLoading = false;
      //   state.isError = false;
      // })
      .addCase(getNotifiCations.fulfilled, (state, action) => {
        // state.notification = [...state.notification, action.payload];
        state.isLoading = false;
        state.isError = false;
        state.notification = action.payload;
      })
      .addCase(setUserDetailsNull.fulfilled, (state, action) => {
        state.userDetail = action.payload;
      })
      .addCase(sendMessageToMany.fulfilled, (state, action) => {
        console.log(action)
      });
  },
});

export default userListSlice.reducer;
