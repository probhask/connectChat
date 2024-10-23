import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { SideProfileApiResponse } from "types";

const initialState: SideProfileApiResponse[] = [];

const sideProfileSlice = createSlice({
  initialState,
  name: "sideProfile",
  reducers: {
    addInitialSideProfile: (
      _,
      action: PayloadAction<SideProfileApiResponse>
    ) => {
      return [{ ...action.payload }];
    },
  },
});
export const { addInitialSideProfile } = sideProfileSlice.actions;
export default sideProfileSlice.reducer;
