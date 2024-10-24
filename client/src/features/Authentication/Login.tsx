import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { Formik } from "formik";
import { Link } from "react-router-dom";
import { LoginFormValidationSchema } from "@utils/validation";
import useAuthentication from "@hooks/useAuthentication";

const Login = () => {
  const { handleLogin, loginLoading } = useAuthentication();

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          textAlign: "center",
          color: "var(--color-light)",
          mb: 4,
        }}
      >
        Login
      </Typography>
      {/* <Box component={"label"}>Email</Box> */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginFormValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values.email, values.password).finally(() => {
            setSubmitting(false);
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Box sx={{ width: "100%" }}>
                <StyledTextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Email Address"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email ? true : false}
                />
                {touched.email && errors.email && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                      mt: "3px",
                      ml: "5px",
                      fontWeight: "500",
                      color: "red",
                    }}
                  >
                    {errors.email}
                  </Typography>
                )}
              </Box>
              <Box sx={{ width: "100%" }}>
                <StyledTextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  placeholder="Email Address"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password ? true : false}
                />
                {touched.password && errors.password && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                      mt: "3px",
                      ml: "5px",
                      fontWeight: "500",
                      color: "red",
                    }}
                  >
                    {errors.password}
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                disabled={isSubmitting || loginLoading}
                sx={{ color: "#fff", backgroundColor: "#000" }}
              >
                {isSubmitting || loginLoading ? "..." : "Login"}
              </Button>
            </Stack>
            <Box sx={{ mt: 1 }}>
              <Box>
                <Typography component="span">Create a new account ?</Typography>
                <Link to="/auth/register" className="text-blue-500 ml-2">
                  Register
                </Link>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;

const StyledTextField = styled(TextField)({
  accentColor: "red",
  caretColor: "#fff",
  width: "100%",
  // overflow: "hidden",
  "& .MuiOutlinedInput-root": {
    // backgroundColor: "var(--color-accent-primary)",

    "& fieldset": {
      borderColor: "#fff",
      colors: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
      color: "#fff",
    },
    "& .Mui-focused fieldset": {
      borderColor: "red",
      color: "#fff",
    },
    "& input": {
      // backgroundColor: "#fff",
      color: "#fff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff",
  },
});
