import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (
    { username }: { username: string },
    { rejectWithValue }: { rejectWithValue: any }
  ) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user") ?? "null");
      const { token } = userInfo ?? {};
      if (token && username) {
        const { data }: any = await axios.get(`${API_URL}/user`, {
          params: {
            username,
          },
          headers: { Authorization: `JWT ${token}` },
        });
        return data;
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
