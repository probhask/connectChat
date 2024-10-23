import { Box, Typography } from "@mui/material";

import { DoneTwoTone } from "@mui/icons-material";
import React from "react";
import { convertDate } from "@utils/convertDate";

type MessageTimeAndStatusProps = {
  isOwn: boolean;
  isSent: boolean;
  createdAt: Date;
};

const MessageTimeAndStatus = React.memo(
  ({ createdAt, isOwn, isSent }: MessageTimeAndStatusProps) => {
    return (
      <Box
        component={"span"}
        sx={{
          alignSelf: "end",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          columnGap: "3px",
          //   pb: "0px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.55rem",
            textAlign: "center",
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {convertDate(createdAt)}
        </Typography>
        {isOwn && isSent && (
          <DoneTwoTone
            sx={{
              width: "10px",
              height: "15px",
            }}
          />
        )}
      </Box>
    );
  }
);

export default MessageTimeAndStatus;
