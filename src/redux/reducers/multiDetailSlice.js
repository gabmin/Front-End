import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

import { DetailDB, DetailVote } from "../actions/multiDetail";
import { AddCommentDB, DelCommentDB } from "../actions/comment";
import { AddChildDB, DelChildDB } from "../actions/childComment";

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
  AddChildDBLoading: false,
  AddChildDBDone: false,
  AddChildDBError: null,
  DelChildDBLoading: false,
  DelChildDBDone: false,
  DelChildDBError: null,
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
        state.multiDetail.comment = [
          ...state.multiDetail.comment,
          action.payload.newComment,
        ];
        // console.log("temptemp", tempMultiDetail);
        // console.log("payload", action.payload.newComment);
        // console.log("current", state.multiDetail.comment);
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

        const targetIdx = state.multiDetail.comment.findIndex(p => {
          const targetId = p.id;
          return targetId == action.payload.newComment.id;
        });

        state.multiDetail.comment.splice(
          targetIdx,
          1,
          action.payload.newComment,
        );

        // const newComment = state.multiDetail.comment.filter(p => {
        //   const targetId = p.id;
        //   return targetId !== action.payload.newComment.id;
        // });
        // state.multiDetail.comment = [...newComment, action.payload.newComment];
      })
      .addCase(DelCommentDB.rejected, (state, action) => {
        state.DelCommentDBLoading = false;
        state.DelCommentDBError = action.error;
      })

      //childcomment 작성하기
      .addCase(AddChildDB.pending, state => {
        state.AddChildDBLoading = true;
        state.AddChildDBDone = false;
        state.AddChildDBError = null;
      })
      .addCase(AddChildDB.fulfilled, (state, action) => {
        state.AddChildDBLoading = false;
        state.AddChildDBDone = true;
        // state.multiDetail.childComment = [
        //   ...state.multiDetail.childComment,
        //   action.payload.childComment,
        // ];
        state.multiDetail.childComment.push(action.payload.childComment);
        console.log("child", action.payload);
      })
      .addCase(AddChildDB.rejected, (state, action) => {
        state.AddChildDBLoading = false;
        state.AddChildDBError = action.error;
      })
      //childcomment 삭제하기
      .addCase(DelChildDB.pending, state => {
        state.DelChildDBLoading = true;
        state.DelChildDBDone = false;
        state.DelChildDBError = null;
      })
      .addCase(DelChildDB.fulfilled, (state, action) => {
        state.DelChildDBLoading = false;
        state.DelChildDBDone = true;
        const targetChildIdx = state.multiDetail.childComment.findIndex(p => {
          const newTargetId = p.id;
          return newTargetId == action.payload.childComment.id;
        });

        state.multiDetail.childComment.splice(
          targetChildIdx,
          1,
          action.payload.childComment,
        );
      })
      .addCase(DelChildDB.rejected, (state, action) => {
        state.DelChildDBLoading = false;
        state.DelChildDBError = action.error;
      }),
});

export default multiDetailSlice;
