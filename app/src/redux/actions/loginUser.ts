import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }: { rejectWithValue: any }
  ) => {
    try {
      return axios
        .post(`${API_URL}/login`, {
          username,
          password,
        })
        .then((response: any) => {
          return response.data;
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
