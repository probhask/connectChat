import { Stack, Typography } from "@mui/material";

import ProfilePreview from "@components/ProfilePreview";
import React from "react";
import { StyledActionButton } from "@components/MuiStyledComponent";

type ActionProfilePreviewProps = {
  userId?: string;
  imageSrc: string;
  username: string;
  isOnline?: boolean;
  buttons: {
    icon: React.ReactNode;
    text: string;
    themeColor: string;
    handleClick?: () => void;
    disable?: boolean;
  }[];
};

const ActionProfilePreview = React.memo(
  ({
    imageSrc,
    username,
    isOnline,
    buttons,
    userId,
  }: ActionProfilePreviewProps) => {
    return (
      <Stack
        sx={{
          flexDirection: buttons && buttons.length > 1 ? "row" : "row",
          alignItems: buttons && buttons.length > 1 ? "center" : "start",
          justifyContent: "center",
          paddingInline: 1.5,
          paddingBlock: 1.5,
          ":hover": {
            backgroundColor: "var(--color-text-primary)",
          },
          flexWrap: "wrap",
          rowGap: 1,
        }}
      >
        <ProfilePreview
          userId={userId}
          imageSrc={imageSrc}
          username={username}
          isOnline={isOnline}
        />

        {buttons && buttons.length > 0 && (
          <Stack
            sx={{
              flexDirection: "row",
              gap: 1,
              flexShrink: 1,
              justifyContent: "space-evenly",
              alignItems: "center",
              width: buttons && buttons.length > 1 ? "100%" : "auto",
              maxWidth: "300px",
            }}
          >
            {buttons?.map(
              ({ icon, themeColor, text, handleClick, disable }, index) => (
                <StyledActionButton
                  pallet={themeColor}
                  key={index}
                  onClick={handleClick}
                  disabled={disable}
                >
                  {icon}

                  <Typography
                    sx={{
                      fontSize: "inherit",
                      color: "inherit",
                      fontWeight: 600,
                    }}
                  >
                    {text}
                  </Typography>
                </StyledActionButton>
              )
            )}
          </Stack>
        )}
      </Stack>
    );
  }
);

export default ActionProfilePreview;
