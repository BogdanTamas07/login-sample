import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HEADER_CONFIG } from "../../constants";
import { Buffer } from "buffer";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { rejectWithValue }: { rejectWithValue: any }
  ) => {
    try {
      await axios.post(
        `${API_URL}/register`,
        { username, email, password: Buffer.from(password).toString("base64") },
        HEADER_CONFIG
      );
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
