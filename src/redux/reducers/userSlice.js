import { createSlice } from "@reduxjs/toolkit";

import {
  checkIdDup,
  checkNickDup,
  getProfileNick,
  login,
  loginCheck,
  logout,
  signup,
  updateNick,
} from "../actions/user";

// 기본 state
export const initialState = {
  userInfo: { nickname: null, userId: null },
  profileNick: null,
  loginLoading: false, // 로그인 시도 중
  loginDone: false,
  loginError: null,
  loginCheckLoading: false, // 로그인체크크 시도 중
  loginCheckDone: false,
  loginCheckError: null,
  logoutLoading: false, // 로그아웃 시도 중
  logoutDone: false,
  logoutError: null,
  signupLoading: false, // 회원가입 시도 중
  signupDone: false,
  signupError: null,
  checkIdDupLoading: false, // 아이디중복 체크 중
  checkIdDupDone: false,
  checkIdDupError: null,
  checkIdDupResult: null,
  checkNickDupLoading: false, // 닉네임중복 체크 중
  checkNickDupDone: false,
  checkNickDupError: null,
  checkNickDupResult: null,
  mainDataLoading: false, // 메인페이지 정보 get 시도 중
  mainDataDone: false,
  mainDataError: null,
  updateNickLoading: false,
  updateNickDone: false,
  updateNickError: null,
  getProfileNickLoading: false,
  getProfileNickDone: false,
  getProfileNickError: null,
};
// toolkit 사용방법
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      // login
      .addCase(login.pending, state => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.userInfo.nickname = action.payload.nickname;
        state.userInfo.userId = action.payload.userId;

        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // loginCheck
      .addCase(loginCheck.pending, state => {
        state.loginCheckLoading = true;
        state.loginCheckDone = false;
        state.loginCheckError = null;
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        state.loginCheckLoading = false;
        state.userInfo.nickname =
          action.payload.nickname === "GUEST" ? null : action.payload.nickname;
        state.userInfo.userId = action.payload.user || null;
        state.loginCheckDone = true;
      })
      .addCase(loginCheck.rejected, (state, action) => {
        state.loginCheckLoading = false;
        state.loginCheckError = action.payload;
      })
      // logout
      .addCase(logout.pending, state => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = { nickname: null, userId: null };
        state.logoutLoading = false;
        state.logoutDone = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.payload;
      })
      // signup
      .addCase(signup.pending, state => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(signup.fulfilled, state => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload;
      })
      // checkIdDup
      .addCase(checkIdDup.pending, state => {
        state.checkIdDupLoading = true;
        state.checkIdDupDone = false;
        state.checkIdDupError = null;
      })
      .addCase(checkIdDup.fulfilled, (state, action) => {
        state.checkIdDupLoading = false;
        state.checkIdDupDone = true;
        state.checkIdDupResult = action.payload.success;
      })
      .addCase(checkIdDup.rejected, (state, action) => {
        state.checkIdDupLoading = false;
        state.checkIdDupError = action.payload;
        state.checkIdDupResult = action.payload.success;
      })
      // checkNickDup
      .addCase(checkNickDup.pending, state => {
        state.checkNickDupLoading = true;
        state.checkNickDupDone = false;
        state.checkNickDupError = null;
      })
      .addCase(checkNickDup.fulfilled, (state, action) => {
        state.checkNickDupLoading = false;
        state.checkNickDupDone = true;
        state.checkNickDupResult = action.payload.success;
      })
      .addCase(checkNickDup.rejected, (state, action) => {
        state.checkNickDupLoading = false;
        state.checkNickDupError = action.payload;
        state.checkNickDupResult = action.payload.success;
      })
      // updateNick
      .addCase(updateNick.pending, state => {
        state.updateNickLoading = true;
        state.updateNickDone = false;
        state.updateNickError = null;
      })
      .addCase(updateNick.fulfilled, (state, action) => {
        state.updateNickLoading = false;
        state.updateNickDone = true;
        state.userInfo.nickname = action.payload.nickname;
        state.profileNick = action.payload.nickname;
      })
      .addCase(updateNick.rejected, (state, action) => {
        state.updateNickLoading = false;
        state.updateNickDone = false;
        state.updateNickError = action.payload;
        if (action.payload === "Validation error") {
          alert("이미 사용중인 닉네임입니다");
        }
      })
      // getProfileNick
      .addCase(getProfileNick.pending, state => {
        state.getProfileNickLoading = true;
        state.getProfileNickDone = false;
        state.getProfileNickError = null;
      })
      .addCase(getProfileNick.fulfilled, (state, action) => {
        state.getProfileNickLoading = false;
        state.getProfileNickDone = true;
        state.profileNick = action.payload.nickname;
      })
      .addCase(getProfileNick.rejected, (state, action) => {
        state.getProfileNickLoading = false;
        state.getProfileNickDone = false;
        state.getProfileNickError = action.payload;
      }),
});

// export const { loginUser } = userSlice.actions;

export default userSlice;
