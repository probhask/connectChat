import React, { Suspense } from "react";
import { Stack, Typography } from "@mui/material";

import { MESSAGE } from "types";
import MessageTimeAndStatus from "./MessageTimeAndStatus";

// import MessageMediaDisplay from "./MessageMediaDisplay";
const MessageMediaDisplay = React.lazy(() => import("./MessageMediaDisplay"));

type MessageItemProps = {
  message: MESSAGE;
  isOwn: boolean;
};

const FormattedMessage = React.memo(({ text }: { text: string }) => {
  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  return formattedText;
});

const MessageItem = React.memo(
  ({
    message: { text, media, isSent, createdAt },
    isOwn,
  }: MessageItemProps) => {
    return (
      <Stack
        sx={{
          flexDirection: "column",
          width: "100%",
          columnGap: 1,
          order: 2,
          fontSize: "0.9rem",
          borderRadius: "6px",
          overflow: "hidden",
          backgroundColor: `${
            isOwn ? "var(--color-bg-primary)" : "var(--color-light)"
          }`,
          color: `${isOwn ? "var(--color-light)" : "var(--color-dark)"}`,
        }}
      >
        {/* media */}
        {media && (
          <Suspense>
            <MessageMediaDisplay media={media} isOwn={isOwn} />
          </Suspense>
        )}
        {/* text message */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            columnGap: 1,
            wordWrap: "break-word",
            paddingInline: "8px",
            paddingBlock: "4px",
          }}
        >
          {/* message text */}
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.9rem",
            }}
          >
            {/* {formattedText(text)} */}
            <FormattedMessage text={text} />
          </Typography>
          {/* time and sent */}
          <MessageTimeAndStatus
            isOwn={isOwn}
            isSent={isSent}
            createdAt={createdAt}
          />
        </Stack>
      </Stack>
    );
  }
);

export default MessageItem;
