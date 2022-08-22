// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import {
  addItem,
  fetchUser,
  fetchItems,
  loginUser,
  registerUser,
  resetPassword,
} from "../actions";

const initialState = {
  loading: false,
  userInfo: null,
  messagesList: [],
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload: { userInfo } }) => {
      state.loading = false;
      state.userInfo = userInfo;
    },
    [loginUser.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [resetPassword.fulfilled]: (state, { payload: { userInfo } }) => {
      state.loading = false;
      state.userInfo = userInfo;
    },
    [resetPassword.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [addItem.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addItem.fulfilled]: (state, { payload: { item = null } }) => {
      state.loading = false;
      state.messagesList = [...state.messagesList, item];
      state.success = true;
    },
    [addItem.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [fetchItems.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchItems.fulfilled]: (state, { payload: { items } }) => {
      state.loading = false;
      state.messagesList = items;
      state.success = true;
    },
    [fetchItems.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUser.fulfilled]: (
      state,
      { payload: { email = "", username = "" } = {} }
    ) => {
      state.loading = false;

      if (email && username) {
        const user = JSON.parse(localStorage.getItem("user") ?? "null");
        const userInfo = { ...user, email, username };

        state.userInfo = userInfo;
      }
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.loading = false;
      const user = JSON.parse(localStorage.getItem("user") ?? "null");
      if (user) state.userInfo = user;
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
