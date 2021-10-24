import { createSlice } from "@reduxjs/toolkit";
import { loginDB } from "../actions/user";

// 기본 state
export const initialState = {
  myInfo: null, // 내 정보
  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
};

// toolkit 사용방법
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: state => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder =>
    builder
      // login
      .addCase(loginDB.pending, state => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(loginDB.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.me = action.payload;
        state.loginDone = true;
      })
      .addCase(loginDB.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      }),
});

export default userSlice;
