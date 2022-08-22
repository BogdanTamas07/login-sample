import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HEADER_CONFIG } from "../../constants";
import { Buffer } from "buffer";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }: { rejectWithValue: any }
  ) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/login`,
        {
          username,
          password: Buffer.from(password).toString("base64"),
        },
        HEADER_CONFIG
      );
      return data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
