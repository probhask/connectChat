import { LoopTwoTone, Send } from "@mui/icons-material";

import { Button } from "@mui/material";
import React from "react";

const SubmitMessageForm = React.memo(
  ({ submitting }: { submitting: boolean }) => {
    return (
      <Button
        type="submit"
        disabled={submitting}
        sx={{
          backgroundColor: "var(--color-bg-primary)",
          color: "white",
          width: 45,
          height: 45,
          boxSizing: "border-box",
          overflow: "hidden",
          alignSelf: "end",
          borderRadius: "50%",

          ml: 1,
        }}
      >
        {submitting ? (
          <LoopTwoTone className="animate-spin" sx={{ color: "inherit" }} />
        ) : (
          <Send sx={{ color: "inherit" }} />
        )}
      </Button>
    );
  }
);
SubmitMessageForm.displayName = "SubmitMessageForm";

export default SubmitMessageForm;
