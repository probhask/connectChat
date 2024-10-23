import { Box } from "@mui/material";
import ProfileAvatar from "@components/ProfileAvatar";
import React from "react";

type MessageAvatarProps = {
  isOwn: boolean;
  imageSrc: string;
  username?: string;
};

const MessageAvatar = React.memo(
  ({ isOwn, imageSrc, username }: MessageAvatarProps) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          columnGap: 1,
          alignSelf: "end",
          order: isOwn ? 10 : 1,
        }}
      >
        <ProfileAvatar
          url={imageSrc}
          alt={username || ""}
          sx={{
            width: "28px",
            height: "28px",
          }}
        />
      </Box>
    );
  }
);
export default MessageAvatar;
