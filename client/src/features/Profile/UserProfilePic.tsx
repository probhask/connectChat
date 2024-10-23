import { Box, IconButton } from "@mui/material";
import { CameraAlt, LoopTwoTone } from "@mui/icons-material";
import React, { useEffect, useRef } from "react";

import { StyledUserAvatar } from "@components/MuiStyledComponent";
import { fileFormat } from "@constants/AcceptMediaFormats";
import { useChatAppSelector } from "@store/hooks";
import useProfileContext from "@context/ProfileContext";

const UserProfilePic = React.memo(() => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const user = useChatAppSelector((store) => store.auth);
  const { profilePicLoading, handleUploadProfilePic, abortUploadProfilePic } =
    useProfileContext();
  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadProfilePic(file);
    }
  };
  useEffect(() => {
    return () => {
      abortUploadProfilePic();
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "50%",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <input
        type="file"
        name=""
        id=""
        style={{ display: "none" }}
        ref={imageInputRef}
        accept={[...fileFormat.images].join(",")}
        onChange={handleImageInputChange}
        disabled={profilePicLoading}
      />
      <StyledUserAvatar
        src={
          user?.profile_picture?.fileName
            ? `http://localhost:5000/api/file/${user?.profile_picture?.fileName}`
            : ""
        }
        // alt={user?.username}
        width="150px"
        height="150px"
        border="var(--color-bg-primary)"
        backcolor="gary"
      />

      <IconButton
        sx={{
          position: "absolute",
          bottom: 5,
          right: 10,
          zIndex: 34,
          color: "white",
          bgcolor: "#000",
          "& :hover": {
            bgColor: "none",
          },
        }}
        onClick={() => imageInputRef?.current?.click()}
      >
        {profilePicLoading ? (
          <LoopTwoTone className="animate-spin" sx={{ color: "inherit" }} />
        ) : (
          <CameraAlt sx={{ height: 25, width: 25 }} />
        )}
      </IconButton>
    </Box>
  );
});

UserProfilePic.displayName = "User Profile Pic";

export default UserProfilePic;
