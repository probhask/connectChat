import { IconButton, Stack, TextField, Tooltip, styled } from "@mui/material";

import { DOC_PREVIEW } from "types";
import { EmojiEmotions } from "@mui/icons-material";
import MediaPreview from "./MediaPreview";
import React from "react";

type MessageInputProps = {
  value: string;
  onchange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  imagePreview: string | null;
  resetImagePreview: () => void;
  resetDocPreview: () => void;
  docPreview: DOC_PREVIEW | null;
};

const MessageInput = React.memo(
  ({
    value,
    onchange,
    docPreview,
    imagePreview,
    resetDocPreview,
    resetImagePreview,
  }: MessageInputProps) => {
    return (
      <Stack
        flexDirection="column"
        flex={1}
        sx={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        {/* file preview */}
        <MediaPreview
          docPreview={docPreview}
          resetDocPreview={resetDocPreview}
          imagePreview={imagePreview}
          resetImagePreview={resetImagePreview}
        />

        <Stack sx={{ flexDirection: "row", flex: 1, paddingLeft: 1 }}>
          {/* msg input */}
          <StyledInput
            placeholder="Type Message..."
            multiline
            name="msg"
            value={value}
            // rows={1}
            maxRows={5}
            fullWidth
            onChange={onchange}
            InputProps={{
              sx: {
                // p: 0,
                // padding: 0,
                border: "none",
                "& textarea": {
                  border: "none",
                },
              },
            }}
            sx={{
              p: 0,
              width: "100%",
              // height: "40px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "0px",
                border: "none",
                "& fieldset": {
                  border: "none",
                },
              },

              "& .MuiOutlinedBase-input": {
                fontSize: "inherit",
                color: "inherit",
              },
            }}
            // className="hide-scrollbar"
          />
          <IconButton sx={{ alignSelf: "end", pb: "13px" }}>
            <Tooltip title="emoji">
              <EmojiEmotions
                sx={{ color: "#FFB02E", background: "transparent" }}
              />
            </Tooltip>
          </IconButton>
        </Stack>
      </Stack>
    );
  }
);
MessageInput.displayName = "MessageInput";

export default MessageInput;

const StyledInput = styled(TextField)({
  flex: 1,
  backgroundColor: "inherit",
  // backgroundColor: "red",
  padding: 0,
  margin: 0,
  "&::after": {
    display: "none",
  },
  "&::before": {
    display: "none",
  },
  // "& textarea": {
  //   resize: "none",
  //   overflow: "auto",
  // },

  // "& .MuiOutlinedInput-root": {
  //   borderRadius: "0px",
  //   border: "none",
  //   "& fieldset": {
  //     border: "none",
  //   },
  // },
  // "& .MuiOutlinedBase-input": {
  //   fontSize: "inherit",
  //   lineHeight: 8,
  //   padding: "0 300px",
  //   minHeight: "500px",
  // },
  color: "var(--color-bg-primary)",
});
