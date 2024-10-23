import {
  Box,
  TextField,
  TextFieldVariants,
  Typography,
  styled,
} from "@mui/material";
import React, { ChangeEvent } from "react";

type InputFieldProps = {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isTouched: boolean | undefined;
  error: string | undefined;
  variant?: TextFieldVariants | undefined;
  id?: string;
  label?: string;
  placeholder?: string;
  name: string;
  type?: React.HTMLInputTypeAttribute | undefined;
};

const InputTextfield = React.memo(
  ({
    error,
    isTouched,
    handleBlur,
    handleChange,
    value,
    name,
    variant,
    label,
    placeholder,
    id,
    type,
  }: InputFieldProps) => {
    return (
      <Box sx={{ width: "100%", textAlign: "start" }}>
        <StyledTextField
          id={id}
          label={label}
          variant={variant}
          placeholder={placeholder}
          name={name}
          value={value}
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
          error={error && isTouched ? true : false}
        />
        {isTouched && error && (
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
            {error}
          </Typography>
        )}
      </Box>
    );
  }
);
InputTextfield.displayName = "InputTextfield";
export default InputTextfield;
const StyledTextField = styled(TextField)({
  accentColor: "red",
  caretColor: "#fff",
  width: "100%",
  color: "#fff",

  "& .MuiInputBase-root": {
    color: "rgba(255,255,255,1)",
  },
  "& .MuiInputBase-root:hover:focus:focus-visible:focus-within": {
    color: "rgba(255,255,255,1)",
  },

  "& .MuiInput-underline:before": {
    borderBottomColor: "rgba(255,255,255,0.6)", // default border color (white with  opacity 0.5)
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "#fff", // hover state border color (fully white )
  },
  "& .MuiInput-underline:hover:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--color-bg-primary)", // Focused state border color  when we leave cursor out off input
  },
  "& .Mui-error:after": {
    borderBottomColor: "red",
  },
  // overflow: "hidden",
  "& .MuiOutlinedInput-root": {
    // backgroundColor: "var(--color-accent-primary)",
    color: "#fff",
    "& fieldset": {
      borderColor: "#fff",
      colors: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
      color: "#fff",
    },
    "& .Mui-focused fieldset": {
      borderColor: "#fff",
      color: "#fff",
    },
    "& input": {
      //   backgroundColor: "#fff",
      color: "#fff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "var(--color-bg-primary)",
    fontWeight: 600,
  },
  "& label .Mui-focused": {
    color: "white",
  },
  // "& .MuiInputLabel-root.Mui-focused": {
  //   color: "#fff",
  // },
});
