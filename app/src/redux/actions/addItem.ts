import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import axios from "axios";

export const addItem = createAsyncThunk(
  "user/addItem",
  async (
    { username, userText }: { username: string; userText: string },
    { rejectWithValue }: { rejectWithValue: any }
  ) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user") ?? "null");
      const { token } = userInfo ?? {};
      if (token && username) {
        const { data }: any = await axios.put(
          `${API_URL}/items`,
          {
            username,
            userText,
            createdAt: Date.now(),
          },
          { headers: { Authorization: `JWT ${token}` } }
        );
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
