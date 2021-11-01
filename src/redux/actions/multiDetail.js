import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

//detail 보기
export const DetailDB = createAsyncThunk(
  "multiDetail/PostDB",
  async (multiId, { rejectWithValue }) => {
    console.log("data", multiId);
    try {
      const response = await api.get(`/posts/multi/${multiId}/target`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
