import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

//post 전체보기
export const PostDB = createAsyncThunk(
  "posts/either",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.get("/post/either");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 진행중보기
export const PostingDB = createAsyncThunk(
  "posts/either/ing",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.get("/post/either/ing");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 종료보기
export const PostCompleteDB = createAsyncThunk(
  "posts/either/complete",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.get("/post/either/complete");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 작성하기
export const addPostDB = createAsyncThunk(
  "post/either",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/post/either", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
