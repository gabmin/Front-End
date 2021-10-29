import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

export const search = createAsyncThunk(
  "/search/keyword",
  async (value, { rejectWithValue }) => {
    try {
      const response = await api.get(`/search`, { params: { keyword: value } });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
