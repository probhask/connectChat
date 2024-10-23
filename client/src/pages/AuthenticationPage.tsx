import { Box, Grid2, Stack, Typography, styled } from "@mui/material";

import { Outlet } from "react-router-dom";
import bg_1280 from "@assets/images/auth/bg_1280.jpg";
import bg_1920 from "@assets/images/auth/bg_1920.jpg";
import bg_640 from "@assets/images/auth/bg_640.jpg";
import bg_lg from "@assets/images/auth/bg_lg.jpg";
import message_icon from "@assets/images/auth/msg_icon.png";

const StyledAuthentication = styled(Grid2)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "var(--color-text-primary)",
  overflow: "hidden",
  position: "relative",
});

const GlassEffectBox = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: "rgba(30, 30, 30,0.2)",
  backdropFilter: "blur(3px)",
  borderRadius: 10,
  boxShadow: "inset 0 0px 10px rgba(0, 0, 0,0.3)",
  width: "90vw",
  maxWidth: "500px",
  padding: 20,

  [theme.breakpoints.up("md")]: {
    width: "500px",
  },
}));

const backgroundStyles = {
  display: "inline-block",
  objectFit: "cover",
  minWidth: "100%",
  minHeight: "100vh",
  width: "100%",
  height: "100vh",
  objectPosition: "top",
};

const AuthenticationPage = () => {
  return (
    <StyledAuthentication>
      <Box
        sx={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <picture>
          <source media="(min-width:2400px)" srcSet={bg_lg} />
          <source media="(min-width:1920px)" srcSet={bg_1920} />
          <source media="(min-width:1280px)" srcSet={bg_1280} />
          <source media="(min-width:640px)" srcSet={bg_640} />
          <img src={bg_640} alt="background" style={backgroundStyles} />
        </picture>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(59, 45, 102,0.7)",
          zIndex: 4,
          display: "flex",
          justifyContent: { xs: "center", md: "center" },
          alignItems: { xs: "start", md: "center" },
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: { xs: "200px", md: "400px" },
              height: { xs: "130px", md: "400px" },
              position: "relative",
              display: "flex",
              flexDirection: { md: "column" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={message_icon}
              sx={{
                width: { xs: "120px", md: "400px" },
                height: { xs: "100px", md: "auto" },
                objectFit: "cover",
                filter: `drop-shadow(2px 4px 6px rgba(0,0,0,0.3))`,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                position: { md: "absolute" },
                top: { md: 270 },
                zIndex: 2,
                fontWeight: 700,
                textAlign: "center",
                color: "var(--color-accent-primary)",
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              }}
            >
              Connect+
            </Typography>
          </Box>
          <GlassEffectBox>
            <Outlet />
          </GlassEffectBox>
        </Stack>
      </Box>
    </StyledAuthentication>
  );
};

export default AuthenticationPage;
