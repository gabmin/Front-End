import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

//multi like
export const AddLikeDB = createAsyncThunk(
  "multiDetail/AddLikeDB",
  async (multiId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/multi/${multiId}/likes`);
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
