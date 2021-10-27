import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

//post 전체보기
export const PostDB = createAsyncThunk(
  "eitherPost/PostDB",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.get("/posts/either");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 진행중보기
export const PostingDB = createAsyncThunk(
  "eitherPost/PostingDB",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.get("/posts/either/ing");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 종료보기
export const PostCompleteDB = createAsyncThunk(
  "eitherPost/PostCompleteDB",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.get("/posts/either/complete");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 작성하기
export const addPostDB = createAsyncThunk(
  "/posts/either",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/posts/either", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 수정하기
export const editPostDB = createAsyncThunk(
  "eitherPost/editPostDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch("/posts/either/:either_id/edit", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 삭제하기
export const deletePostDB = createAsyncThunk(
  "eitherPost/deletePostDB",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.delete("/posts/either/:either_id");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 종료하기
export const completePostDB = createAsyncThunk(
  "eitherPost/completePostDB",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.patch("/posts/either/:either_id/complete");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 좋아요
export const likePostDB = createAsyncThunk(
  "eitherPost/likePostDB",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.post("/posts/either/:either_id/complete");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 투표하기
export const votePostDB = createAsyncThunk(
  "eitherPost/votePostDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/posts/either/:either_id/vote", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
