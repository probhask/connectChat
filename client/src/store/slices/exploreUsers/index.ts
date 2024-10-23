import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SHORT_USER } from "types";

const initialState: SHORT_USER[] = [];

const exploreUsers = createSlice({
  initialState,
  name: "exploreUsers",
  reducers: {
    addInitialUserData: (_, action: PayloadAction<SHORT_USER[]>) => {
      return [...action.payload];
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const data = [...state];
      const updatedData = data.filter((data) => data._id !== action.payload);
      return updatedData;
    },
    addUser: (state, action: PayloadAction<SHORT_USER>) => {
      const updatedData = [...state, action.payload];
      return updatedData;
    },
  },
});

export const { addInitialUserData, addUser, removeUser } = exploreUsers.actions;
export default exploreUsers.reducer;
