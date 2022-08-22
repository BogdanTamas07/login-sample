import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HEADER_CONFIG } from "../../constants";
import axios from "axios";

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (
    { email }: { email: string },
    { rejectWithValue }: { rejectWithValue: any }
  ) => {
    try {
      axios.post(`${API_URL}/forgotPassword`, {
        email,
      }, HEADER_CONFIG);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
