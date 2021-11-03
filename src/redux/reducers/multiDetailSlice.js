import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

import { DetailDB, DetailVote } from "../actions/multiDetail";
import { AddCommentDB, DelCommentDB } from "../actions/comment";

export const initialState = {
  DetailDBLoading: false,
  DetailDBDone: false,
  DetailDBError: null,
  multiDetail: [],
  DetailVoteLoading: false,
  DetailVoteDone: false,
  DetailVoteError: null,
  multiVote: [],
  AddCommentDBLoading: false,
  AddCommentDBDone: false,
  AddCommentDBError: null,
  DelCommentDBLoading: false,
  DelCommentDBDone: false,
  DelCommentDBError: null,
};

const multiDetailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    detailLoad: state => {
      state.multiDetail = localStorage;
    },
  },
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
      })
      .addCase(DetailVote.rejected, (state, action) => {
        state.DetailVoteLoading = false;
        state.DetailVoteError = action.error;
      })
      //comment 생성하기
      .addCase(AddCommentDB.pending, state => {
        state.AddCommentDBLoading = true;
        state.AddCommentDBDone = false;
        state.AddCommentDBError = null;
      })
      .addCase(AddCommentDB.fulfilled, (state, action) => {
        state.AddCommentDBLoading = false;
        state.AddCommentDBDone = true;
        const tempMultiDetail = [
          ...state.multiDetail.comment,
          action.payload.newComment,
        ];
        console.log("temptemp", tempMultiDetail);
        // state.multiDetail = action.payload;
        console.log("payload", action.payload.newComment);
        console.log("current", current(state.multiDetail.comment));
      })
      .addCase(AddCommentDB.rejected, (state, action) => {
        state.AddCommentDBLoading = false;
        state.AddCommentDBError = action.error;
      })
      //comment 삭제하기
      .addCase(DelCommentDB.pending, state => {
        state.DelCommentDBLoading = true;
        state.DelCommentDBDone = false;
        state.DelCommentDBError = null;
      })
      .addCase(DelCommentDB.fulfilled, (state, action) => {
        state.DelCommentDBLoading = false;
        state.DelCommentDBDone = true;
        // state.multiPost = [...state.multiPost, action.payload];
      })
      .addCase(DelCommentDB.rejected, (state, action) => {
        state.DelCommentDBLoading = false;
        state.DelCommentDBError = action.error;
      }),
});

export default multiDetailSlice;
