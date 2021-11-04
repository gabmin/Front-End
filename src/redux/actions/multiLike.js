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

//comment like
export const AddLikeComment = createAsyncThunk(
  "multiDetail/AddLikeComment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/posts/multi/${data.multiId}/comment/${data.id}/likes`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
