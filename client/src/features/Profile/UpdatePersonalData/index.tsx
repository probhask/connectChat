import { Button, Stack, Typography } from "@mui/material";

import { Formik } from "formik";
import InputTextfield from "@components/Forms/InputTextfield";
import { UpdatePersonalDataFormValidation } from "@utils/validation";
import toast from "react-hot-toast";
import { useChatAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProfileContext from "@context/ProfileContext";

const UpdatePersonalData = () => {
  const navigate = useNavigate();
  const user = useChatAppSelector((store) => store.auth);
  const {
    abortUpdateProfile,
    handleUpdateProfileData,
    updateProfileLoading,
    updateProfileError,
  } = useProfileContext();

  useEffect(() => {
    return () => {
      abortUpdateProfile();
    };
  }, []);

  return (
    <Stack
      sx={{
        backgroundColor: "transparent",
        color: "inherit",
        paddingBlock: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontSize: { xs: "2rem" },
          marginBottom: 6,
        }}
      >
        Update Your Account Details
      </Typography>
      <Formik
        initialValues={{ username: user.username, email: user.email }}
        validationSchema={UpdatePersonalDataFormValidation}
        validateOnChange={true}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          if (
            values.username !== user.username ||
            values.email !== user.email
          ) {
            handleUpdateProfileData(values.username, values.email)
              .then(() => {
                if (!updateProfileError) {
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
                id="username"
                label="User Name"
                variant="standard"
                placeholder="User Name"
                name="username"
                error={errors.username}
                isTouched={touched.username}
                value={values.username}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <InputTextfield
                variant="standard"
                id="email"
                label="Email"
                placeholder="Email Address"
                name="email"
                value={values.email}
                error={errors.email}
                isTouched={touched.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <Button
                type="submit"
                disabled={isSubmitting || updateProfileLoading}
                sx={{
                  mt: 4,
                  color: "#fff",
                  backgroundColor: "var(--color-bg-primary)",
                }}
              >
                {isSubmitting || updateProfileLoading
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

export default UpdatePersonalData;
