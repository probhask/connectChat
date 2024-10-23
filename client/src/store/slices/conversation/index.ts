import type { CONVERSATION_ROOM, MESSAGE } from "types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CONVERSATION_ROOM = {
  conversation: {
    _id: "",
    participants: [],

    isGroupChat: false,
    groupName: "Unwon",
    group_picture: null,
  },
  messages: [],
};

const conversationRoomSlice = createSlice({
  initialState: initialState,
  name: "conversationRoom",
  reducers: {
    addInitialConversationRoomData: (
      _,
      action: PayloadAction<CONVERSATION_ROOM>
    ) => {
      return { ...action.payload };
    },
    addMessage: (state, action: PayloadAction<MESSAGE>) => {
      const updatedMessages = [...state.messages, action.payload];
      return { ...state, messages: updatedMessages };
    },
    removeMessages: (state, action: PayloadAction<string[]>) => {
      const messagesToRemove = action.payload;
      const updatedMessages = state.messages.filter(
        (message) => !messagesToRemove.includes(message._id)
      );
      return { ...state, messages: updatedMessages };
    },
  },
});
export const { addInitialConversationRoomData, addMessage, removeMessages } =
  conversationRoomSlice.actions;
export default conversationRoomSlice.reducer;
