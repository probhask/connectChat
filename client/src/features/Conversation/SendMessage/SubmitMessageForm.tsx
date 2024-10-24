import { LoopTwoTone, Send } from "@mui/icons-material";

import { IconButton } from "@mui/material";
import React from "react";

const SubmitMessageForm = React.memo(
  ({ submitting }: { submitting: boolean }) => {
    return (
      <IconButton
        type="submit"
        disabled={submitting}
        sx={{
          // backgroundColor: "var(--color-bg-primary)",
          color: "var(--color-bg-primary)",
          // color: "white",
          width: "40px",
          height: "40px",
          boxSizing: "border-box",
          overflow: "hidden",
          alignSelf: "end",
          borderRadius: "50%",
          ml: 1,
          mb: 0.7,
          minWidth: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {submitting ? (
          <LoopTwoTone
            className="animate-spin"
            sx={{ color: "inherit", fontSize: "25px" }}
          />
        ) : (
          <Send sx={{ color: "inherit", fontSize: "25px" }} />
        )}
      </IconButton>
    );
  }
);
SubmitMessageForm.displayName = "SubmitMessageForm";

export default SubmitMessageForm;
