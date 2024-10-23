import { ArrowBack, MoreVert } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, styled } from "@mui/material";

import React from "react";
import useChatAppContext from "@context/index";

const TopNavigateBtn = React.memo(() => {
  const { hideProfileTab } = useChatAppContext();
  return (
    <TopNavigation sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton onClick={hideProfileTab}>
        <Tooltip title="back">
          <ArrowBack />
        </Tooltip>
      </IconButton>
      <IconButton>
        <Tooltip title="option">
          <MoreVert />
        </Tooltip>
      </IconButton>
    </TopNavigation>
  );
});
TopNavigateBtn.displayName = "TopNavigateBtn";

export default TopNavigateBtn;
const TopNavigation = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});
