import { SxProps, Theme } from "@mui/material";

import React from "react";
import { StyledUserAvatar } from "@components/MuiStyledComponent";

type ProfileAvatarProps = {
  isOnline?: boolean;
  url: string | undefined;
  alt?: string;
  sx?: SxProps<Theme> | undefined;
  handleClick?: (e: React.MouseEvent) => void;
};
const ProfileAvatar = React.memo(
  ({
    url = "",
    isOnline = false,
    alt = "",
    sx,
    handleClick,
  }: ProfileAvatarProps) => {
    return (
      <StyledUserAvatar
        live={isOnline.toString()}
        alt={alt}
        src={`${import.meta.env.VITE_BACKEND_URL}/api/file/${url}`}
        sx={sx}
        onClick={handleClick}
      />
    );
  }
);
ProfileAvatar.displayName = "ProfileAvatar";

export default ProfileAvatar;
