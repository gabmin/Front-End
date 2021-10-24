import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

export const loginDB = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
