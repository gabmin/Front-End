import { createSlice } from "@reduxjs/toolkit";
import { getMainData } from "../actions/main";

export const initialState = {
  mainPosts: [],
  mainDataLoading: false,
  mainDataDone: false,
  mainDataError: null,
};
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // getMainData
      .addCase(getMainData.pending, state => {
        state.mainDataLoading = true;
        state.mainDataDone = false;
        state.mainDataError = null;
      })
      .addCase(getMainData.fulfilled, (state, action) => {
        state.mainDataLoading = false;
        state.mainDataDone = true;
        state.mainPosts = action.payload;
      })
      .addCase(getMainData.rejected, (state, action) => {
        state.mainDataLoading = false;
        state.mainDataError = action.payload;
      }),
});

export default mainSlice;
