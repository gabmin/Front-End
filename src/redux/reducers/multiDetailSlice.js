import { createSlice } from "@reduxjs/toolkit";

import { DetailDB, DetailVote } from "../actions/multiDetail";

export const initialState = {
  DetailDBLoading: false,
  DetailDBDone: false,
  DetailDBError: null,
  multiDetail: [],
  DetailVoteLoading: false,
  DetailVoteDone: false,
  DetailVoteError: null,
  multiVote: [],
};

const multiDetailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      //detail 보기
      .addCase(DetailDB.pending, state => {
        state.DetailDBLoading = true;
        state.DetailDBDone = false;
        state.DetailDBError = null;
      })
      .addCase(DetailDB.fulfilled, (state, action) => {
        state.DetailDBLoading = false;
        state.DetailDBDone = true;
        state.multiDetail = action.payload;
        console.log("action", action);
      })
      .addCase(DetailDB.rejected, (state, action) => {
        state.DetailDBLoading = false;
        state.DetailDBError = action.error;
      })
      //detail 투표
      .addCase(DetailVote.pending, state => {
        state.DetailVoteLoading = true;
        state.DetailVoteDone = false;
        state.DetailVoteError = null;
      })
      .addCase(DetailVote.fulfilled, (state, action) => {
        state.DetailVoteLoading = false;
        state.DetailVoteDone = true;
        state.multiVote = action.payload;
        console.log("action", action);
      })
      .addCase(DetailVote.rejected, (state, action) => {
        state.DetailVoteLoading = false;
        state.DetailVoteError = action.error;
      }),
});

export default multiDetailSlice;
