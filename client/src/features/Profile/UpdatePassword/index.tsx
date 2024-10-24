import { Button, Stack, Typography } from "@mui/material";

import { ChangePasswordFormValidation } from "@utils/validation";
import { Formik } from "formik";
import InputTextfield from "@components/Forms/InputTextfield";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useProfileContext from "@context/ProfileContext";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { handleUpdatePassword, updatePasswordLoading, updatePasswordError } =
    useProfileContext();
  return (
    <Stack
      sx={{
        backgroundColor: "transparent",
        color: "inherit",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 5, fontSize: { xs: "2rem" } }}
      >
        Update Your Account Details
      </Typography>
      <Formik
        initialValues={{ password: "", newPassword: "", confirmPassword: "" }}
        validationSchema={ChangePasswordFormValidation}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
          if (values.password && values.newPassword) {
            handleUpdatePassword(values.password, values.newPassword)
              .then(() => {
                if (!updatePasswordError) {
                  setTimeout(() => {
                    navigate(-1);
                  }, 1000);
                }
              })
              .catch((error) => {
                toast.error(error?.message);
              })
              .finally(() => {
                setSubmitting(false);
              });
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack
              sx={{
                rowGap: 2,
              }}
            >
              <InputTextfield
                id="password"
                label="Password"
                variant="standard"
                placeholder="Enter your password"
                name="password"
                type="password"
                error={errors.password}
                isTouched={touched.password}
                value={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <InputTextfield
                variant="standard"
                id="newPassword"
                label="New Password"
                placeholder="Enter your new password"
                name="newPassword"
                type="password"
                value={values.newPassword}
                error={errors.newPassword}
                isTouched={touched.newPassword}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <InputTextfield
                variant="standard"
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                isTouched={touched.confirmPassword}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <Button
                type="submit"
                disabled={isSubmitting || updatePasswordLoading}
                sx={{
                  mt: 4,
                  color: "#fff",
                  backgroundColor: "var(--color-bg-primary)",
                }}
              >
                {isSubmitting || updatePasswordLoading
                  ? "Updating ..."
                  : "Update"}
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

export default UpdatePassword;
