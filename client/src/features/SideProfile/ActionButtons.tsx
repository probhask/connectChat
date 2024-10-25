import { Add, ExitToApp, PersonRemove } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React, { useMemo } from "react";

import styled from "@emotion/styled";
import useFriendContext from "@context/FriendContext";

const ActionButtons = React.memo(
  ({
    btnStatus,
    type,
    profileId,
  }: {
    type: "GROUP_PROFILE" | "USER_PROFILE";
    btnStatus: boolean;
    profileId: string;
  }) => {
    const { unfriendLoading, handleUnfriendUser, removeFriendId } =
      useFriendContext();

    // const {} = useFriendR;/

    const btn = useMemo(() => {
      if (type === "GROUP_PROFILE" && btnStatus) {
        return {
          text: "Leave Group",
          pallet: "#C62E2E",
          icon: <ExitToApp />,
          click: () => {},
        };
      } else if (type === "GROUP_PROFILE" && !btnStatus) {
        return {
          text: "Join Group",
          pallet: "#6256CA",
          icon: <Add />,
          click: () => {},
        };
      } else if (type === "USER_PROFILE" && btnStatus) {
        return {
          text:
            unfriendLoading && removeFriendId === profileId
              ? "..."
              : "Unfriend",
          pallet: "#C62E2E",
          icon: <PersonRemove />,
          click: () => handleUnfriendUser(profileId),
        };
      } else if (type === "USER_PROFILE" && !btnStatus) {
        return {
          text: "ADD",
          pallet: "#6256CA",
          icon: <Add />,
          click: () => {},
        };
      }
    }, [btnStatus, type, unfriendLoading, removeFriendId, profileId]);

    return (
      <Stack
        sx={{
          width: "100%",
          gap: 1,
          p: 1.5,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "sticky",
          bottom: 0,
          bgcolor: "inherit",
          zIndex: 2,
        }}
      >
        {btn && (
          <ProfileSectionActionButton pallet={btn.pallet} onClick={btn.click}>
            {btn.icon}
            {btn.text}
          </ProfileSectionActionButton>
        )}
      </Stack>
    );
  }
);
ActionButtons.displayName = "ActionButtons";

export default ActionButtons;

const ProfileSectionActionButton = styled(Button)<{ pallet: string }>(
  ({ pallet = "blue" }) => ({
    width: "100%",
    maxWidth: "300px",
    border: `2px solid ${pallet}`,
    backgroundColor: "inherit",
    color: pallet,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",

    ":hover": {
      backgroundColor: pallet,
      color: "#ffffff",
    },
  })
);
