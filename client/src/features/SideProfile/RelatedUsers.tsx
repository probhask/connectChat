import { Box, Stack, Typography } from "@mui/material";

import ProfilePreview from "@components/ProfilePreview";
import React from "react";
import { SHORT_USER } from "types";

const RelatedUsers = React.memo(
  ({ users, isGroup = false }: { users: SHORT_USER[]; isGroup: boolean }) => {
    return (
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          sx={{ ml: 2, mt: 1, fontSize: "1.1rem", fontWeight: 600 }}
        >
          {isGroup ? "Members" : "Friends"}
        </Typography>
        <Stack
          sx={{
            rowGap: 2.5,
            overflowY: "auto",
            mx: "auto",
            width: "100%",
            ml: 2,
            paddingBlock: "20px",
          }}
        >
          <>
            {users &&
              users?.length > 0 &&
              users.map((user) => (
                <ProfilePreview
                  key={user?._id}
                  imageSrc={user?.profile_picture?.fileName || ""}
                  username={user?.username}
                  userId={user?._id}
                />
              ))}
          </>
        </Stack>
      </Box>
    );
  }
);
RelatedUsers.displayName = "Related Users";
export default RelatedUsers;
