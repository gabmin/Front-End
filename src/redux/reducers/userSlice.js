import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import {
  checkIdDup,
  checkNickDup,
  login,
  logout,
  signup,
} from "../actions/user";

// 기본 state
export const initialState = {
  userInfo: { nickname: null, userId: null },
  loginLoading: false, // 로그인 시도 중
  loginDone: false,
  loginError: null,
  logoutLoading: false, // 로그아웃웃 시도 중
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
};
// toolkit 사용방법
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: state => {
      state.userInfo.nickname = getCookie("nickname");
      state.userInfo.userId = getCookie("userId");
      state.loginDone = false;
    },
  },
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
        setCookie("nickname", action.payload.nickname);
        setCookie("userId", action.payload.userId);
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // logout
      .addCase(logout.pending, state => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = { nickname: null, userId: null };
        deleteCookie("nickname");
        deleteCookie("userId");
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
      }),
});

export const { loginUser } = userSlice.actions;

export default userSlice;
