import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

//detail 보기
export const DetailDB = createAsyncThunk(
  "multiDetail/PostDB",
  async (multiId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/multi/${multiId}/target`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

//detail 투표하기
export const DetailVote = createAsyncThunk(
  "multiDetail/DetailVote",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await api.post(
        `/posts/multi/${data.multiId}/votes`,
        data.select,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
