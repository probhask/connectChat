import { Box, Typography } from "@mui/material";

import { Error } from "@mui/icons-material";
import React from "react";

export const EmptyData = React.memo(
  ({ message = "Not data" }: { message: React.ReactNode }) => {
    return (
      <Typography
        sx={{
          textAlign: "center",
          paddingBlock: "20px",
          width: "100%",
          color: " var(--color-bg-primary)",
          fontSize: "1.1rem",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {message}
      </Typography>
    );
  }
);

export const LoadingState = React.memo(
  ({ message = "loading..." }: { message?: string }) => {
    return (
      <Typography
        sx={{
          textAlign: "center",
          paddingBlock: "20px",
          width: "100%",
          color: " #404040",
          fontSize: "0.95rem",
        }}
      >
        {message}...
      </Typography>
    );
  }
);

export const ErrorState = React.memo(
  ({ error = "error..." }: { error?: string }) => {
    return (
      <Box
        sx={{
          textAlign: "center",
          paddingBlock: "40px",
          width: "100%",
          color: " var(--color-red)",
          fontSize: "0.95rem",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Error sx={{ width: "1.3rem", height: "auto", mr: 1 }} />
        <Typography> {error}</Typography>
      </Box>
    );
  }
);
