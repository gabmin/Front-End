import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

//post 전체보기
export const PostDB = createAsyncThunk(
  "eitherPost/PostDB",
  async (data, { rejectWithValue }) => {
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
  async (data, { rejectWithValue }) => {
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
  async (data, { rejectWithValue }) => {
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
      const response = await api.patch(
        `/posts/either/${data.eitherId}/edit`,
        data.data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 삭제하기
export const deletePostDB = createAsyncThunk(
  "eitherPost/deletePostDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/posts/either/${data}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 종료하기
export const completePostDB = createAsyncThunk(
  "eitherPost/completePostDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/posts/either/${data}/complete`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//post 좋아요
export const likePostDB = createAsyncThunk(
  "eitherPost/likePostDB",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/either/${data}/likes`);
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
      const response = await api.post(
        `/posts/either/${data.eitherId}/votes`,
        data.data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
