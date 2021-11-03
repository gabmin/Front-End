import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

// childComment 작성하기
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

// childComment 삭제하기
export const DelChildDB = createAsyncThunk(
  "multiPost/DelChildDB",
  async (data, { rejectWithValue }) => {
    console.log("delchildData", data);
    try {
      const response = await api.patch(
        `/posts/multi/${data.multiId}/childComment/${data.id}/delete`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
