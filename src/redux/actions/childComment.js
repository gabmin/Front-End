import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

// comment 작성하기
export const AddChildDB = createAsyncThunk(
  "multiPost/AddChildDB",
  async (data, { rejectWithValue }) => {
    console.log("addchildData", data);
    try {
      const response = await api.post(
        `/posts/multi/${data.multiId}/comment/${data.commentId}`,
        data.data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
