import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { FRIEND_REQUEST } from "types";

type FRIEND_REQUEST_INITIAL_STATE = {
  received: FRIEND_REQUEST[];
  sended: FRIEND_REQUEST[];
};
const initialState: FRIEND_REQUEST_INITIAL_STATE = {
  received: [],
  sended: [],
};

const friendRequestSlice = createSlice({
  initialState,
  name: "friendRequest",
  reducers: {
    addInitialFriendRequestData: (
      _,
      action: PayloadAction<FRIEND_REQUEST_INITIAL_STATE>
    ) => {
      return { ...action.payload };
    },

    addInitialSentFriendRequestData: (
      state,
      action: PayloadAction<FRIEND_REQUEST[]>
    ) => {
      return { ...state, sended: [...action.payload] };
    },

    addInitialReceivedFriendRequestData: (
      state,
      action: PayloadAction<FRIEND_REQUEST[]>
    ) => {
      return { ...state, received: [...action.payload] };
    },
    addSentRequest: (state, action: PayloadAction<FRIEND_REQUEST>) => {
      return { ...state, sended: [...state.sended, action.payload] };
    },
    addReceivedRequest: (state, action: PayloadAction<FRIEND_REQUEST>) => {
      return { ...state, received: [...state.received, action.payload] };
    },
    removeReceivedRequest: (state, action: PayloadAction<string>) => {
      const receivedRequest = state.received.filter(
        (req) => req._id !== action.payload
      );
      console.log(
        "removeReceivedRequest called",
        action.payload,
        receivedRequest
      );
      return { ...state, received: [...receivedRequest] };
    },
    removeSentRequest: (state, action: PayloadAction<string>) => {
      const sendedRequest = state.sended.filter(
        (req) => req._id !== action.payload
      );
      return { ...state, sended: [...sendedRequest] };
    },
  },
});

export const {
  addInitialFriendRequestData,
  addInitialSentFriendRequestData,
  addInitialReceivedFriendRequestData,
  addReceivedRequest,
  addSentRequest,
  removeReceivedRequest,
  removeSentRequest,
} = friendRequestSlice.actions;

export default friendRequestSlice.reducer;
