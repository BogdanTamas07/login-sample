import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../constants';
import { Buffer } from 'buffer';
import axios, { AxiosError } from 'axios';

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (
    { email, password, token }: { email: string; password: string; token: string },
    { rejectWithValue }: { rejectWithValue: (value: string) => void }
  ) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/resetPassword`,
        {
          email,
          password: Buffer.from(password).toString('base64')
        },
        {
          headers: {
            Authorization: `JWT ${token}`
          }
        }
      );

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
