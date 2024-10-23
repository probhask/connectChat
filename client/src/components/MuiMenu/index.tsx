import { Menu, MenuItem } from "@mui/material";

import React from "react";

type MuiMenuProps = {
  anchorEl: HTMLElement | null;
  close: () => void;
  items: { text: string; click: () => void }[];
};

const MuiMenu = React.memo(({ anchorEl, close, items }: MuiMenuProps) => {
  if (items && items.length > 0) {
    return (
      <Menu
        id="more-options"
        aria-label="more-option"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          top: 40,
        }}
      >
        {items?.map(({ click, text }, index) => (
          <MenuItem key={index} onClick={click}>
            {text}
          </MenuItem>
        ))}
      </Menu>
    );
  }
});

export default MuiMenu;
