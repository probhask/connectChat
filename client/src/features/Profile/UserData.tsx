import { Box, Button, Stack, Typography, styled } from "@mui/material";
import { ContactMail, Key, Logout, NoPhotography } from "@mui/icons-material";

import UserProfilePic from "./UserProfilePic";
import useAuthentication from "@hooks/useAuthentication";
import { useChatAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProfileContext from "@context/ProfileContext";

const UserData = () => {
  const user = useChatAppSelector((store) => store.auth);
  const { handleRemoveProfilePic, removePicLoading, abortRemoveProfilePic } =
    useProfileContext();
  const navigate = useNavigate();
  const { handleLogoutUser, logoutLoading } = useAuthentication();

  useEffect(() => {
    return () => {
      abortRemoveProfilePic();
    };
  }, []);
  return (
    <Stack
      sx={{
        alignItems: "center",
      }}
    >
      {/* user image */}
      <UserProfilePic />
      {/* name and email */}
      <Box sx={{ marginTop: 1, marginBottom: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            textOverflow: "clip",
            lineClamp: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textWrap: "wrap",
          }}
        >
          {user?.username}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            wordWrap: "break-word",
            textOverflow: "clip",
            lineClamp: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {user?.email}
        </Typography>
      </Box>

      {/* action buttons */}
      <Stack
        sx={{
          rowGap: 2,
        }}
      >
        <StyledButton
          bgcolor="#e53935"
          onClick={handleRemoveProfilePic}
          disabled={removePicLoading}
        >
          <NoPhotography /> Remove Picture
        </StyledButton>
        <StyledButton
          bgcolor="#388e3c"
          onClick={() => navigate("update-personal")}
        >
          <ContactMail /> Update Account Details
        </StyledButton>

        <StyledButton
          bgcolor="#ffa000"
          onClick={() => navigate("update-password")}
        >
          <Key /> Change Password
        </StyledButton>
        <StyledButton
          bgcolor="#d32f2f"
          onClick={handleLogoutUser}
          disabled={logoutLoading}
        >
          <Logout /> {logoutLoading ? "logging out..." : "Logout"}
        </StyledButton>
      </Stack>
    </Stack>
  );
};
UserData.displayName = "UserData";
export default UserData;

const StyledButton = styled(Button)<{ bgcolor?: string }>(
  ({ bgcolor = "blue" }) => ({
    backgroundColor: bgcolor,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 4,
    // boxShadow: `0 0 4px ${bgcolor}`,
    border: bgcolor,
  })
);
