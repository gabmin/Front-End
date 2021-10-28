import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

export const getMainData = createAsyncThunk(
  "/",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/");
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
