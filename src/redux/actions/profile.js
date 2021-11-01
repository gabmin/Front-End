import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";

export const getMyPosts = createAsyncThunk(
  "/profiles/:user_id/posts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profiles/${id}/posts`);
      return response.data;
    } catch (err) {
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

export const getProfileNick = createAsyncThunk(
  "/profiles/getnick",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/profiles/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
