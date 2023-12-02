import userList from "./slice.js";
import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./socketSlice";
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    userList: userList,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      ...getDefaultMiddleware(),
      serializableCheck: false,
    }),
});
  