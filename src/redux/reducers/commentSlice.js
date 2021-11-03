// import { createSlice } from "@reduxjs/toolkit";

// import { AddCommentDB, DelCommentDB } from "../actions/comment";

// export const initialState = {
//   AddCommentDBLoading: false,
//   AddCommentDBDone: false,
//   AddCommentDBError: null,
//   DelCommentDBLoading: false,
//   DelCommentDBDone: false,
//   DelCommentDBError: null,
//   NewCommentList: [],
// };

// const commentSlice = createSlice({
//   name: "comment",
//   initialState,
//   reducers: {},
//   extraReducers: builder =>
//     builder
//       //comment 작성하기
//       .addCase(AddCommentDB.pending, state => {
//         state.AddCommentDBLoading = true;
//         state.AddCommentDBDone = false;
//         state.AddCommentDBError = null;
//       })
//       .addCase(AddCommentDB.fulfilled, (state, action) => {
//         state.AddCommentDBLoading = false;
//         state.AddCommentDBDone = true;
//         state.multiPost = [...state.multiPost, action.payload];
//       })
//       .addCase(AddCommentDB.rejected, (state, action) => {
//         state.AddCommentDBLoading = false;
//         state.AddCommentDBError = action.error;
//       })
//       //comment 삭제하기
//       .addCase(DelCommentDB.pending, state => {
//         state.DelCommentDBLoading = true;
//         state.DelCommentDBDone = false;
//         state.DelCommentDBError = null;
//       })
//       .addCase(DelCommentDB.fulfilled, (state, action) => {
//         state.DelCommentDBLoading = false;
//         state.DelCommentDBDone = true;
//         // state.multiPost = [...state.multiPost, action.payload];
//       })
//       .addCase(DelCommentDB.rejected, (state, action) => {
//         state.DelCommentDBLoading = false;
//         state.DelCommentDBError = action.error;
//       }),
// });

// export default commentSlice;
