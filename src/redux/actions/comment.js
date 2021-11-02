import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

// multi 작성하기
export const AddCommentDB = createAsyncThunk(
  "multiPost/AddCommentDB",
  async (data, { rejectWithValue }) => {
    console.log("addcommentData", data);
    try {
      const response = await api.post(
        `/posts/multi/${data.multiId}/comment`,
        data.data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
