import { createSlice } from "@reduxjs/toolkit";
import { loginDB } from "../actions/user";

// 기본 state
export const initialState = {
  userInfo: "admin",
  loginLoading: false,
  loginDone: false,
  loginError: null,
};

// toolkit 사용방법
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: state => {
      state.userInfo = null;
      state.loginDone = false;
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
        state.userInfo = action.payload;
        state.loginDone = true;
      })
      .addCase(loginDB.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      }),
});

export default userSlice;
