import { Stack, Typography } from "@mui/material";

import ProfileAvatar from "@components/ProfileAvatar";
import React from "react";
import useChatAppContext from "@context/index";

type ProfilePreviewProps = {
  userId?: string;
  imageSrc: string;
  username: string;
  isOnline?: boolean;
};

const ProfilePreview = React.memo(
  ({ userId, imageSrc, username, isOnline }: ProfilePreviewProps) => {
    const { showProfileTab, updateUserProfileId } = useChatAppContext();
    const handleAvatarCLick = (e: React.MouseEvent) => {
      if (userId) {
        e.stopPropagation();
        showProfileTab();
        updateUserProfileId(userId);
      }
    };
    return (
      <Stack
        direction="row"
        sx={{
          flex: 1,
          flexShrink: 0,
          m: 0,
          alignItems: "center",
          columnGap: 1,
          overflow: "hidden",
          width: "max-content",
          minWidth: "150px",
        }}
      >
        {/* <StyledUserAvatar src={imageSrc} live={isOnline?.toString()} /> */}
        <ProfileAvatar
          isOnline={isOnline}
          alt={username}
          url={imageSrc}
          handleClick={handleAvatarCLick}
        />

        <Typography
          sx={{
            flex: 1,
            textOverflow: "clip",
            lineClamp: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {username}
        </Typography>
      </Stack>
    );
  }
);

export default ProfilePreview;
