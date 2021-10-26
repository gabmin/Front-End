import { createSlice } from "@reduxjs/toolkit";
import { loginDB } from "../actions/user";

// 기본 state
export const initialState = {
  user: "test",
  title: "삼성전자 손절할까요?",
  contentA: "손절 ㄱ",
  contentB: "존버 ㄱ",
  date: "2021-10-26 10:33:20",
  likeCnt: 15,
  voteCntA: 67,
  voteCntB: 74,
  complete: false,
  voted: true,
};

// toolkit 사용방법
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    logoutUser: state => {
      state.userInfo = null;
      state.loginDone = false;
    },
  },
  extraReducers: builder =>
    builder
      // PostGet
      .addCase(loginDB.pending, state => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(loginDB.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.userInfo = action.payload;
        state.loginDone = true;
      })
      .addCase(loginDB.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      }),
});

export default postSlice;
