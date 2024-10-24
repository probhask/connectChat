import { Stack, styled } from "@mui/material";

import AddMedia from "./AddMedia";
import { Formik } from "formik";
import MessageInput from "./MessageInput";
import React from "react";
import SubmitMessageForm from "./SubmitMessageForm";
import useMessage from "@hooks/useMessage";

const SendMessage = React.memo(() => {
  const {
    handleFileChange,
    sendMessage,
    docPreview,
    imagePreview,
    resetDocPreview,
    resetImagePreview,
    resetMedia,
  } = useMessage();

  return (
    <Formik
      initialValues={{ msg: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        sendMessage(values.msg)
          .then(() => {
            resetForm();
            resetMedia();
            setSubmitting(false);
          })
          .catch(() => setSubmitting(false));
      }}
      s
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <SendMessageBox>
            {/* attach document */}
            <AddMedia handleMediaChange={handleFileChange} />

            {/* msg box */}
            <MessageInput
              value={values.msg}
              onchange={handleChange}
              docPreview={docPreview}
              resetDocPreview={resetDocPreview}
              imagePreview={imagePreview}
              resetImagePreview={resetImagePreview}
            />
            {/* send message icon */}
            <SubmitMessageForm submitting={isSubmitting} />
          </SendMessageBox>
        </form>
      )}
    </Formik>
  );
});
SendMessage.displayName = "Send Message";
export default SendMessage;

const SendMessageBox = styled(Stack)({
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "",
  background: "transparent",
  width: "100%",
  paddingRight: 2,
});
