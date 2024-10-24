import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useRef } from "react";

import { AttachFile } from "@mui/icons-material";
import { acceptMediaFormat } from "@constants/AcceptMediaFormats";

type AddMediaProps = {
  handleMediaChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
};
const AddMedia = React.memo(({ handleMediaChange }: AddMediaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      sx={{
        height: 40,
        alignSelf: "end",
      }}
    >
      <IconButton
        sx={{
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Tooltip title="image">
          <AttachFile />
        </Tooltip>
        <input
          type="file"
          style={{ width: 0, height: 0, display: "none" }}
          id="file-upload"
          accept={acceptMediaFormat}
          ref={fileInputRef}
          name="image"
          onChange={handleMediaChange}
        />
      </IconButton>
    </Box>
  );
});

export default AddMedia;