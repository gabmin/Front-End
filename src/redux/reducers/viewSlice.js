import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  viewStatus: false,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    SetView: (state, action) => {
      state.viewStatus = action.payload;
    },
  },
});

export const { SetView } = viewSlice.actions;

export default viewSlice;
