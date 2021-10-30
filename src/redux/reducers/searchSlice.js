import { createSlice } from "@reduxjs/toolkit";
import { search } from "../actions/search";

export const initialState = {
  searchList: [],
};
const searchSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // search
      .addCase(search.pending, state => {
        state.mainDataLoading = true;
        state.mainDataDone = false;
        state.mainDataError = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.mainDataLoading = false;
        state.mainDataDone = true;
        state.searchList = action.payload.posts;
      })
      .addCase(search.rejected, (state, action) => {
        state.mainDataLoading = false;
        state.searchList = action.payload;
      }),
});

export default searchSlice;
