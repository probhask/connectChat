import {
  Box,
  Button,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useMemo } from "react";

import { MoreVert } from "@mui/icons-material";
import MuiMenu from "@components/MuiMenu";
import { navigationLinks } from "@constants/navigationLink";
import useAuthentication from "@hooks/useAuthentication";
import useMuiMenu from "@hooks/useMuiMenu";

const LeftSideTopBar = React.memo(() => {
  const { anchorEl, handleOpenMenu, handleCloseMenu } = useMuiMenu();
  const { handleLogoutUser } = useAuthentication();
  const navigate = useNavigate();
  const menuItems = useMemo(() => {
    return [
      { text: "Profile Settings", click: () => navigate("/profile") },
      { text: "Logout", click: () => handleLogoutUser() },
    ];
  }, []);

  return (
    <TopBar>
      <BrandNav>
        {/* <Box> */}
        <Typography
          variant="h4"
          component="span"
          sx={{ fontWeight: "700", textTransform: "capitalize" }}
        >
          Connect +
        </Typography>
        {/* </Box> */}
        <Box>
          <Tooltip title="option">
            <StyledIconButton onClick={handleOpenMenu}>
              <MoreVert />
            </StyledIconButton>
          </Tooltip>
        </Box>
      </BrandNav>
      <NavigationTray className="hide-scrollbar">
        {navigationLinks.map(({ pathLink, pathTitle }, index) => (
          <NavigationTab key={index}>
            <NavLink
              to={pathLink}
              className={({ isActive }) =>
                `${
                  isActive &&
                  "border-b-2 border-b-[var(--color-bg-primary)] text-[var(--color-bg-primary)] font-extrabold"
                }  w-full`
              }
            >
              {pathTitle}
            </NavLink>
          </NavigationTab>
        ))}
      </NavigationTray>

      <MuiMenu anchorEl={anchorEl} close={handleCloseMenu} items={menuItems} />
    </TopBar>
  );
});

LeftSideTopBar.displayName = "LeftSideTopBar";
export default LeftSideTopBar;

const TopBar = styled(Grid2)({
  width: "100%",
  background: "var(--color-bg-secondary)",
  color: "var(--color-dark)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  // paddingTop: 4,
  rowGap: 10,
  // position: "relative",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 30,
});
TopBar.displayName = "TopBar";

const BrandNav = styled(Grid2)({
  color: "var(--color-bg-primary)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInline: "6px",
  position: "relative",
});
BrandNav.displayName = "BrandNav";

const NavigationTray = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  fontWeight: 600,
  color: "var(--color-dark)",
  overflowX: "auto",
  height: "35px",
});
NavigationTray.displayName = "NavigationTray";

const NavigationTab = styled(Button)({
  minWidth: "80px",
  flexGrow: 1,
  flexShrink: 0,
  height: "100%",
  textTransform: "capitalize",
  textAlign: "center",
  fontSize: "0.9rem",
  color: "inherit",
  borderRadius: 0,
  overflowX: "visible",
  ":hover": {
    color: "var(--color-bg-primary)",
    fontWeight: 900,
  },
});
NavigationTab.displayName = "NavigationTab";

const StyledIconButton = styled(IconButton)({
  color: "inherit",
});
