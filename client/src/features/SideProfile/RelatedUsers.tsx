import { Box, Stack } from "@mui/material";

import ProfilePreview from "@components/ProfilePreview";
import React from "react";
import { SHORT_USER } from "types";

const RelatedUsers = React.memo(({ users }: { users: SHORT_USER[] }) => {
  return (
    <Box sx={{ flex: 1 }}>
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
});
RelatedUsers.displayName = "Related Users";
export default RelatedUsers;
