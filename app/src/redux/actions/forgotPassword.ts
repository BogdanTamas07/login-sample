import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
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
      });
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
