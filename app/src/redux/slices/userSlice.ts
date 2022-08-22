import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
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

const userSlice: { reducer: unknown; actions: unknown } = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: RootState) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(
        loginUser.fulfilled,
        (state: RootState, { payload: { userInfo = null } }) => {
          state.loading = false;
          state.userInfo = userInfo;
        }
      ),
      builder.addCase(
        loginUser.rejected,
        (state: RootState, { payload = null, error = null }) => {
          state.loading = false;
          if (payload) {
            state.error = { message: payload };
          } else {
            state.error = error;
          }
        }
      ),
      builder.addCase(resetPassword.pending, (state: RootState) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(
        resetPassword.fulfilled,
        (state: RootState, { payload: { userInfo = null } }) => {
          state.loading = false;
          state.userInfo = userInfo;
        }
      ),
      builder.addCase(
        resetPassword.rejected,
        (state: RootState, { error = null }) => {
          state.loading = false;
          state.error = error;
        }
      ),
      builder.addCase(registerUser.pending, (state: RootState) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(registerUser.fulfilled, (state: RootState) => {
        state.loading = false;
        state.success = true;
      }),
      builder.addCase(
        registerUser.rejected,
        (state: RootState, { error = null }) => {
          state.loading = false;
          state.error = error;
        }
      ),
      builder.addCase(addItem.pending, (state: RootState) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(
        addItem.fulfilled,
        (state: RootState, { payload: { item = null } }) => {
          state.loading = false;
          state.messagesList = [...state.messagesList, item];
          state.success = true;
        }
      ),
      builder.addCase(
        addItem.rejected,
        (state: RootState, { error = null }) => {
          state.loading = false;
          state.error = error;
        }
      ),
      builder.addCase(fetchItems.pending, (state: RootState) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(
        fetchItems.fulfilled,
        (state: RootState, { payload: { items = [] } }) => {
          state.loading = false;
          state.messagesList = items;
          state.success = true;
        }
      ),
      builder.addCase(
        fetchItems.rejected,
        (state: RootState, { error = null }) => {
          state.loading = false;
          state.error = error;
        }
      ),
      builder.addCase(fetchUser.pending, (state: RootState) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(
        fetchUser.fulfilled,
        (state: RootState, { payload: { email = "", username = "" } = {} }) => {
          state.loading = false;

          if (email && username) {
            const user = JSON.parse(localStorage.getItem("user") ?? "null");
            const userInfo = { ...user, email, username };

            state.userInfo = userInfo;
          }
        }
      ),
      builder.addCase(
        fetchUser.rejected,
        (state: RootState, { payload = null }) => {
          state.loading = false;
          const user = JSON.parse(localStorage.getItem("user") ?? "null");
          if (user) state.userInfo = user;
          state.error = payload;
        }
      );
  },
});

export default userSlice.reducer;
