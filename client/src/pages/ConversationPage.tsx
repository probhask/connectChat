import { Box, styled } from "@mui/material";

import ConversationTopBar from "@features/Conversation/ConversationTopBar";
import EmptyMessage from "@components/EmptyMessage";
import { MessageContextProvider } from "@context/messageContext";
import MessagesList from "@features/Conversation/MessagesList";
import SendMessage from "@features/Conversation/SendMessage";
import useChatAppContext from "@context/index";
import useConversation from "@hooks/useConversation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ConversationPage = () => {
  const { conversationTab, conversationRoomId, hideConversationTab } =
    useChatAppContext();
  const location = useLocation();
  const { fetchConversation } = useConversation();

  useEffect(() => {
    if (
      conversationRoomId &&
      // conversationTab &&
      (location.pathname === "/" || window.innerWidth > 600)
    ) {
      fetchConversation(conversationRoomId);
    }
  }, [conversationRoomId, location, conversationTab]);

  useEffect(() => {
    if (!conversationRoomId && (conversationTab || window.innerWidth > 600)) {
      hideConversationTab();
    }
  }, [conversationRoomId, conversationTab]);

  return (
    <MessageContextProvider>
      <ConversationBox key={conversationRoomId}>
        {conversationRoomId ? (
          <ChatContainer>
            <ConversationTopBar key={conversationRoomId + "top-bar"} />
            <MessagesList key={conversationRoomId} />
            <SendMessage />
          </ChatContainer>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "var(--color-light-gray)",
            }}
          >
            <Box
              sx={{
                padding: 1,
                maxWidth: { sm: "400px" },
              }}
            >
              <EmptyMessage
                primaryText="No active conversation"
                secondaryText="It look like you haven't selected a conversation yet. Start a conversation with your friends now!"
                buttonText="Start Chat"
                navigateTo="/friends"
              />
            </Box>
          </Box>
        )}
      </ConversationBox>
    </MessageContextProvider>
  );
};

export default ConversationPage;
const ConversationBox = styled(Box)({
  width: "100%",
  height: "100vh",
  backgroundColor: "var(--color-light)",
  boxShadow: "0 4px 5px rgba(0,0,0,0.5)",
});
ConversationBox.displayName = "ConversationBox";

const ChatContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  // backgroundColor: "var(--color-light)",
  background: "url(/chatAppBg.png)",
  position: "relative",
});
ChatContainer.displayName = "ChatContainer";
