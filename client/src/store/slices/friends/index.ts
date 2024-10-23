import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { FRIEND } from "types";

const initialState: FRIEND[] = [];

const friendSlice = createSlice({
  initialState: initialState,
  name: "friend",
  reducers: {
    addInitialFriendData: (_, action: PayloadAction<FRIEND[]>) => {
      return [...action.payload];
    },
    removeFriend: (state, action: PayloadAction<string>) => {
      const data = [...state];
      const updatedData = data.filter((data) => data._id !== action.payload);
      return updatedData;
    },
    addFriend: (state, action: PayloadAction<FRIEND>) => {
      const updatedData = [...state, action.payload];
      console.log("addFriend called", action.payload, updatedData);

      return updatedData;
    },
  },
});
export const { addInitialFriendData, addFriend, removeFriend } =
  friendSlice.actions;
export default friendSlice.reducer;
