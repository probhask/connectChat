import { Box, Stack } from "@mui/material";

import { BiLoaderCircle } from "react-icons/bi";
import React from "react";

const LoadingFallback = React.memo(() => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <BiLoaderCircle className="size-10 md:size-20 animate-spin duration-1000 ease-in text-[var(--color-bg-primary)] " />
      </Box>
    </Stack>
  );
});
LoadingFallback.displayName = "LoadingFallback";
export default LoadingFallback;
