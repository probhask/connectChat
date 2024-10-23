import { ArrowBack, Delete, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useMemo } from "react";

import MuiMenu from "@components/MuiMenu";
import { convertDate } from "@utils/convertDate";
import useChatAppContext from "@context/index";
import { useChatAppSelector } from "@store/hooks";
import useMessage from "@hooks/useMessage";
import useMessageContext from "@context/messageContext";
import useMuiMenu from "@hooks/useMuiMenu";

const ConversationTopBar = React.memo(() => {
  const {
    updateConversationRoomId,
    hideConversationTab,
    showProfileTab,
    updateUserProfileId,
  } = useChatAppContext();
  const conversation = useChatAppSelector(
    (store) => store.conversationRoom.conversation
  );
  const { handleDeleteMessage } = useMessage();
  const { selectedMessageIds } = useMessageContext();

  const { anchorEl, handleOpenMenu, handleCloseMenu } = useMuiMenu();

  const navigateToUser = (userId: string) => {
    if (userId) {
      hideConversationTab();
      showProfileTab();
      updateUserProfileId(userId);
    }
  };

  const getUserProfileId = useMemo(() => {
    return conversation.isGroupChat
      ? conversation._id
      : !Array.isArray(conversation.participants)
      ? conversation.participants?._id
      : "";
  }, [conversation]);

  const avatarImage: string = useMemo(() => {
    if (conversation?.isGroupChat) {
      return conversation.group_picture?.fileName || "";
    }

    if (Array.isArray(conversation.participants)) {
      return "";
    } else {
      return conversation.participants.profile_picture?.fileName || "";
    }
  }, [conversation]);

  const conversationUserName = useMemo(() => {
    if (conversation?.isGroupChat) {
      return conversation.groupName;
    }

    if (Array.isArray(conversation.participants)) {
      return "Unknown";
    } else {
      return conversation.participants.username || "Unknown";
    }
  }, [conversation]);

  const isOnlineText = useMemo(() => {
    if (!conversation?.isGroupChat) {
      if (!Array.isArray(conversation.participants)) {
        const participant = conversation.participants;

        if (participant.isOnline) {
          return "Online";
        } else if (participant.lastSeen) {
          return convertDate(participant.lastSeen);
        }
      }
    }

    return "";
  }, [conversation]);

  const menuItems = useMemo(() => {
    return [
      {
        text: "User Profile",
        click: () => {
          if (getUserProfileId) {
            navigateToUser(getUserProfileId);
          }
        },
      },
    ];
  }, [getUserProfileId]);

  return (
    <TopBar>
      <StyledIconButton
        // sx={{ display: { display: "block", sm: "none" } }}
        onClick={() => {
          hideConversationTab();
          updateConversationRoomId("");
        }}
      >
        <ArrowBack />
      </StyledIconButton>

      {/* profile info */}
      <ProfileInfo>
        <IconButton onClick={() => navigateToUser(getUserProfileId)}>
          <Avatar
            src={`http://localhost:5000/api/file/${avatarImage}`}
            sx={{ width: 35, height: 35 }}
          />
        </IconButton>
        <Box>
          <Typography variant="body1" sx={{ m: 0, p: 0, lineHeight: "1rem" }}>
            {conversationUserName}
          </Typography>
          <Typography
            component="span"
            variant="body2"
            sx={{ fontSize: "0.7rem" }}
          >
            {isOnlineText}
          </Typography>
        </Box>
      </ProfileInfo>
      <Stack sx={{ flexDirection: "row" }}>
        {selectedMessageIds.length > 0 && (
          <Tooltip title="delete">
            <StyledIconButton onClick={handleDeleteMessage}>
              <Delete />
            </StyledIconButton>
          </Tooltip>
        )}
        <Tooltip title="option">
          <StyledIconButton onClick={handleOpenMenu}>
            <MoreVert />
          </StyledIconButton>
        </Tooltip>
      </Stack>
      <MuiMenu anchorEl={anchorEl} close={handleCloseMenu} items={menuItems} />
    </TopBar>
  );
});

export default ConversationTopBar;

const TopBar = styled(Grid2)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "var(--color-bg-secondary)",
  color: "var(--color-dark)",
  paddingBlock: 3,
  paddingInline: 0,
  columnGap: 3,
  [theme.breakpoints.up("sm")]: {
    padding: 10,
    // paddingLeft: 20,
  },
}));
const ProfileInfo = styled(Grid2)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  columnGap: 8,
});
const StyledIconButton = styled(IconButton)({
  color: "inherit",
});
