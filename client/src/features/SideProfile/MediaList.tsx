import { Box, Stack, Typography } from "@mui/material";

import React from "react";

const media = [
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
  "image.jpeg",
];

const MediaList = React.memo(() => {
  return (
    <Box
      flex={1}
      sx={{ paddingInline: 2, paddingBlock: 1, overflowY: "auto" }}
      className="hide-scrollbar"
    >
      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
        Media
      </Typography>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          scrollBehavior: "smooth",
        }}
      >
        {media.map((media, index) => (
          <Box
            key={index}
            sx={{
              width: "100px",
              height: "100px",
              overflow: "hidden",
              borderRadius: "4px",
            }}
          >
            <img src={media} alt="media" />
          </Box>
        ))}
      </Stack>
    </Box>
  );
});
MediaList.displayName = "MediaList";

export default MediaList;
