import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../shared/api";
import { history } from "../configureStore";

export const login = createAsyncThunk(
  "/users/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", data);
      console.log("login response");
      console.log(response);
      localStorage.setItem("nickname", response.data.nickname);
      history.push("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const signup = createAsyncThunk(
  "/users/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const checkIdDup = createAsyncThunk(
  "/users/signup/id",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup/id", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const checkNickDup = createAsyncThunk(
  "/users/signup/nick",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/signup/nick", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
