import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { CONVERSATION } from "types";

const initialState: CONVERSATION[] = [];

const groupSlice = createSlice({
  initialState: initialState,
  name: "group",
  reducers: {
    addInitialGroupData: (_, action: PayloadAction<CONVERSATION[]>) => {
      return [...action.payload];
    },
    addGroup: (state, action: PayloadAction<CONVERSATION>) => {
      const updateGroupsList = [...state, action.payload];
      return updateGroupsList;
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      const updateGroupList = state.filter(
        (group) => group._id !== action.payload
      );
      return updateGroupList;
    },
  },
});
export const { addInitialGroupData, addGroup, removeGroup } =
  groupSlice.actions;
export default groupSlice.reducer;
