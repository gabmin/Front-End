import { createSlice } from "@reduxjs/toolkit";
import { getMyPosts, getMyPolls } from "../actions/profile";

export const initialState = {
  myPosts: [],
  myPolls: [],
};
const profileSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // getMyPosts
      .addCase(getMyPosts.pending, state => {
        state.mainDataLoading = true;
        state.mainDataDone = false;
        state.mainDataError = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.mainDataLoading = false;
        state.mainDataDone = true;
        state.myPosts = action.payload.posts;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.mainDataLoading = false;
        state.myPosts = action.payload;
      })
      // getMyPolls
      .addCase(getMyPolls.pending, state => {
        state.mainDataLoading = true;
        state.mainDataDone = false;
        state.mainDataError = null;
      })
      .addCase(getMyPolls.fulfilled, (state, action) => {
        state.mainDataLoading = false;
        state.mainDataDone = true;
        state.myPolls = action.payload.posts;
      })
      .addCase(getMyPolls.rejected, (state, action) => {
        state.mainDataLoading = false;
        state.myPolls = action.payload;
      }),
});

export default profileSlice;
