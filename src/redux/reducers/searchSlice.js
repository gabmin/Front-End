import { createSlice } from "@reduxjs/toolkit";
import { search } from "../actions/search";

export const initialState = {
  searchList: [],
  searchLoading: false,
  searchDone: false,
  searchError: null,
};
const searchSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // search
      .addCase(search.pending, state => {
        state.searchLoading = true;
        state.searchDone = false;
        state.searchError = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchDone = true;
        state.searchList = action.payload.posts;
      })
      .addCase(search.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchList = action.payload;
      }),
});

export default searchSlice;
