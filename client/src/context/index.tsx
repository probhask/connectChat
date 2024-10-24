import React, { useCallback, useContext, useState } from "react";
import { getSessionStorage, storeToSessionStorage } from "@utils/localStorage";

import { createContext } from "react";

export type CHAT_APP_CONTEXT = {
  conversationTab: boolean;
  showConversationTab: () => void;
  hideConversationTab: () => void;
  updateConversationRoomId: (id: string) => void;
  conversationRoomId: string | null;
  profileTab: boolean;
  isGroupProfile: boolean;
  showProfileTab: () => void;
  hideProfileTab: () => void;
  updateUserProfileId: (id: string, isGroup?: boolean) => void;
  userProfileId: string | null;
};
export const ChatAppContext = createContext<CHAT_APP_CONTEXT | undefined>(
  undefined
);

export const ChatAppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [conversationTab, setConversationTab] = useState<boolean>(
    getSessionStorage<boolean>("conversation-tab") || false
  );
  const [isGroupProfile, setIsGroupProfile] = useState<boolean>(
    getSessionStorage<boolean>("group-profile") || false
  );
  const [profileTab, setProfileTab] = useState<boolean>(
    getSessionStorage<boolean>("profile-tab") || false
  );
  const [conversationRoomId, setConversationRoomId] = useState<string | null>(
    getSessionStorage<string>("conversationRoomId")
  );
  const [userProfileId, setUserProfileId] = useState<string | null>(
    getSessionStorage<string>("user-profile-id")
  );

  const showConversationTab = useCallback(() => {
    setConversationTab(true);
    storeToSessionStorage("conversation-tab", true);
    hideProfileTab();
  }, []);
  const hideConversationTab = useCallback(() => {
    setConversationTab(false);
    storeToSessionStorage("conversation-tab", false);
  }, []);
  const updateConversationRoomId = useCallback((id: string) => {
    storeToSessionStorage("conversationRoomId", id);
    setConversationRoomId(id);
  }, []);

  const showProfileTab = useCallback(() => {
    setProfileTab(true);
    storeToSessionStorage("profile-tab", true);
    hideConversationTab();
  }, []);
  const hideProfileTab = useCallback(() => {
    setProfileTab(false);
    storeToSessionStorage("profile-tab", false);
  }, []);
  const updateUserProfileId = useCallback((id: string, isGroup?: boolean) => {
    storeToSessionStorage("user-profile-id", id);
    if (isGroup) {
      storeToSessionStorage("group-profile", true);
      setIsGroupProfile(true);
    } else {
      storeToSessionStorage("group-profile", false);
      setIsGroupProfile(false);
    }
    setUserProfileId(id);
  }, []);

  const contextProviderValues = {
    // conversation tab
    conversationTab,
    showConversationTab,
    hideConversationTab,
    updateConversationRoomId,
    conversationRoomId,
    //profile tab
    profileTab,
    isGroupProfile,
    showProfileTab,
    hideProfileTab,
    updateUserProfileId,
    userProfileId,
  };

  return (
    <ChatAppContext.Provider value={contextProviderValues}>
      {children}
    </ChatAppContext.Provider>
  );
};

const useChatAppContext = () => {
  const context = useContext(ChatAppContext);

  if (!context) {
    throw new Error(
      "useChatAppContext hook must be used within ChatAppContextProvider"
    );
  }
  return context;
};

export default useChatAppContext;
