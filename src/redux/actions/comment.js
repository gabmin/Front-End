import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

// comment 작성하기
export const AddCommentDB = createAsyncThunk(
  "multiPost/AddCommentDB",
  async (data, { rejectWithValue }) => {
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

export const EditCommentDB = createAsyncThunk(
  "multiPost/EditCommentDB",
  async (data, { rejectWithValue }) => {
    console.log("editcommentData", data);
    try {
      const response = await api.patch(
        `/posts/multi/${data.multiId}/comment/${data.id}/edit`,
        data.data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// comment 삭제하기
export const DelCommentDB = createAsyncThunk(
  "multiPost/DelCommentDB",
  async (data, { rejectWithValue }) => {
    console.log("delcommentData", data);
    try {
      const response = await api.patch(
        `/posts/multi/${data.multiId}/comment/${data.id}/delete`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
