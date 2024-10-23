import {
  authReducer,
  chatListReducer,
  conversationRoomReducer,
  exploreUsersReducer,
  friendRequestReducer,
  friendsReducer,
  sideProfileReducer,
} from "./slices";

import { configureStore } from "@reduxjs/toolkit";

const chatAppStore = configureStore({
  reducer: {
    auth: authReducer,
    exploreUsers: exploreUsersReducer,
    chatList: chatListReducer,
    conversationRoom: conversationRoomReducer,
    friendRequest: friendRequestReducer,
    friends: friendsReducer,
    sideProfile: sideProfileReducer,
  },
});

export type RootState = ReturnType<typeof chatAppStore.getState>;
export type AppDispatch = typeof chatAppStore.dispatch;
export default chatAppStore;
