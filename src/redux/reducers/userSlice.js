import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { checkIdDup, checkNickDup, login, signup } from "../actions/user";
import { history } from "../configureStore";

// 기본 state
export const initialState = {
  userInfo: null,
  loginLoading: false, // 로그인 시도 중
  loginDone: false,
  loginError: null,
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
};
// toolkit 사용방법
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: state => {
      state.userInfo = getCookie("nickname");
      state.loginDone = false;
    },
    logoutUser: state => {
      state.userInfo = null;
      state.loginDone = false;
      deleteCookie("nickname");
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
        state.userInfo = action.payload.nickname;
        setCookie("nickname", action.payload.nickname);
        state.loginDone = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
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

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice;
