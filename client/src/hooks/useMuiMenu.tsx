import React, { useState } from "react";

const useMuiMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e?.currentTarget);
    // setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return { anchorEl, handleCloseMenu, handleOpenMenu };
};

export default useMuiMenu;
