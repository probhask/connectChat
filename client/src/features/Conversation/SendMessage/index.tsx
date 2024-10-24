import React, { useCallback, useState } from "react";
import { Stack, styled } from "@mui/material";

import AddMedia from "./AddMedia";
import { Formik } from "formik";
import MessageInput from "./MessageInput";
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
  const [showEmoji, setShowEmoji] = useState(false);
  const toggleEmoji = useCallback(() => {
    setShowEmoji(!showEmoji);
  }, [showEmoji]);
  const hideEmoji = useCallback(() => {
    setShowEmoji(false);
  }, []);

  return (
    <Formik
      initialValues={{ msg: "" }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        hideEmoji();
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
      {({ values, handleChange, handleSubmit, isSubmitting, setValues }) => (
        <form onSubmit={handleSubmit}>
          <SendMessageBox>
            {/* attach document */}
            <AddMedia
              handleMediaChange={handleFileChange}
              hideEmoji={hideEmoji}
            />

            {/* msg box */}
            <MessageInput
              value={values.msg}
              onchange={handleChange}
              docPreview={docPreview}
              resetDocPreview={resetDocPreview}
              imagePreview={imagePreview}
              resetImagePreview={resetImagePreview}
              setValues={setValues}
              showEmoji={showEmoji}
              toggleEmoji={toggleEmoji}
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
  alignItems: "center",
  backgroundColor: "",
  background: "transparent",
  width: "100%",
  paddingRight: 1,
  paddingBottom: 5,
});
