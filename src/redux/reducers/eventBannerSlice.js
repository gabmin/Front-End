import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  bannerStatus: true,
};

const eventBannerSlice = createSlice({
  name: "eventBanner",
  initialState,
  reducers: {
    SetEventBanner: (state, action) => {
      state.bannerStatus = action.payload;
    },
  },
});

export const { SetEventBanner } = eventBannerSlice.actions;

export default eventBannerSlice;
