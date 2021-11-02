import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../shared/api";
import { history } from "../configureStore";

export const getMyPosts = createAsyncThunk(
  "/profiles/:user_id/posts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profiles/${id}/posts`);
      return response.data;
    } catch (err) {
      alert("로그인 후 접속이 가능합니다");
      history.push("/login");
      return rejectWithValue(err.response.data);
    }
  },
);

export const getMyPolls = createAsyncThunk(
  "/profiles/:user_id/polls",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profiles/${id}/polls`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
