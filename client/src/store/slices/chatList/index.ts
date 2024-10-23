import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CHAT_LIST } from "types";

const initialState: CHAT_LIST[] = [];

const chatListSlice = createSlice({
  initialState,
  name: "chatList",
  reducers: {
    addInitialChatList: (_, action: PayloadAction<CHAT_LIST[]>) => {
      return action.payload;
    },
  },
});
export const { addInitialChatList } = chatListSlice.actions;
export default chatListSlice.reducer;
