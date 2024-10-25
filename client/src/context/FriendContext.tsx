import React, { createContext, useContext } from "react";

import useFriend from "@hooks/useFriend";

type FriendContextType = {
  friendError: string | null;
  friendLoading: boolean;
  abortFriends: () => void;
  removeFriendId: string | null;
  unfriendError: string | null;
  unfriendLoading: boolean;
  handleUnfriendUser: (friendId: string) => Promise<void>;
  abortUnfriend: () => void;
  conversationFriendId: string | null;
  conversationRoomLoading: boolean;
  handleFindConversationRoom: (friendId: string) => Promise<void>;
};

export const FriendContext = createContext<FriendContextType | undefined>(
  undefined
);

export const FriendContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    //fetch friend
    friendError,
    friendLoading,
    abortFriends,
    //unfriend
    removeFriendId,
    unfriendError,
    unfriendLoading,
    handleUnfriendUser,
    abortUnfriend,
    //enter conversation room
    conversationFriendId,
    conversationRoomLoading,
    handleFindConversationRoom,
  } = useFriend();

  const values = {
    //fetch friend
    friendError,
    friendLoading,
    abortFriends,
    //unfriend
    removeFriendId,
    unfriendError,
    unfriendLoading,
    handleUnfriendUser,
    abortUnfriend,
    //enter conversation room
    conversationFriendId,
    conversationRoomLoading,
    handleFindConversationRoom,
  };

  return (
    <FriendContext.Provider value={values}>{children}</FriendContext.Provider>
  );
};

const useFriendContext = () => {
  const context = useContext(FriendContext);
  if (!context) {
    throw new Error(
      "useFriendContext hook must be used within FriendContextProvider"
    );
  }
  return context;
};

export default useFriendContext;
