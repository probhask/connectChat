import { Box, Button, Stack, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "var(--color-bg-primary)",
        pt: "5rem",
      }}
    >
      <Box>
        <Box sx={{ mb: "2rem", color: "var(--color-accent-primary)" }}>
          <Typography variant="h3">404</Typography>

          <Typography variant="h5">Page Not Found</Typography>
        </Box>

        <Button
          sx={{
            backgroundColor: "var(--color-accent-primary)",
            color: "var(--color-light)",
          }}
          onClick={() => navigate("/", { replace: true })}
        >
          Go Back to Home Page
        </Button>
      </Box>
    </Stack>
  );
};

export default NotFoundPage;
