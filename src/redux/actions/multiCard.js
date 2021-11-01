import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

//post 전체보기
export const PostDB = createAsyncThunk(
  "multiPost/PostDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts/multi");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 진행중보기
export const PostingDB = createAsyncThunk(
  "multiPost/PostingDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts/multi/ing");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 종료보기
export const PostCompleteDB = createAsyncThunk(
  "multiPost/PostCompleteDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/posts/multi/complete");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
// multi 작성하기
export const AddPostDB = createAsyncThunk(
  "multiPost/AddPostDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/posts/multi", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
// multi 삭제하기
export const DeletePostDB = createAsyncThunk(
  "multiPost/DeletePostDB",
  async (multiId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/posts/multi/${multiId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
