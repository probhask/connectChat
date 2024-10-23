import { DOC_PREVIEW, SUCCESS_RESPONSE } from "types";
import React, { useCallback, useEffect, useState } from "react";
import { addMessage, removeMessages } from "@store/slices/conversation";
import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";

import axiosError from "@utils/AxiosError/axiosError";
import toast from "react-hot-toast";
import useChatAppContext from "@context/index";
import useFetchData from "./useFetchData";
import useMessageContext from "@context/messageContext";
import useRefresh from "./useRefresh";
import useSocketContext from "@context/SocketContext";

const updateDocPreview = (uploadedFileName: string): DOC_PREVIEW => {
  console.log("file Name: " + uploadedFileName);
  if (uploadedFileName) {
    const ext = uploadedFileName.split(".").pop()?.toLowerCase();
    if (ext) {
      return { extension: ext, name: uploadedFileName };
    } else {
      console.log("unsupported file type");
      return { extension: "?", name: "unsupported" };
    }
  } else {
    return { extension: "?", name: "not found" };
  }
};

const useMessage = () => {
  const currentUserId = useChatAppSelector((store) => store.auth._id);
  const { selectedMessageIds, clearAllSelectedMessage } = useMessageContext();
  const { conversationRoomId: conversationId } = useChatAppContext();
  const { socket } = useSocketContext();
  const api = useRefresh();

  const dispatch = useChatAppDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [docPreview, setDocPreview] = useState<DOC_PREVIEW | null>(null);
  const controller = new AbortController();

  // file change
  const resetImagePreview = useCallback(() => {
    setImagePreview(null);
    setFile(null);
  }, []);
  const resetDocPreview = useCallback(() => {
    setDocPreview(null);
    setFile(null);
  }, []);
  const resetMedia = useCallback(() => {
    setDocPreview(null);
    setImagePreview(null);
    setFile(null);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFile = e.target.files?.[0];
      if (uploadedFile) {
        setFile(uploadedFile);
        const uploadedFileName = uploadedFile.name;

        const fileType = uploadedFile.type;
        console.log("file type: " + fileType);

        //if image
        if (fileType.startsWith("image/")) {
          const reader = new window.FileReader();
          console.log("reader", reader);
          setDocPreview(null);

          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(uploadedFile);
          reader.onerror = () => {
            console.error("reader error");
          };
        } else {
          const createdPreview = updateDocPreview(uploadedFileName);

          if (createdPreview.name) {
            console.log(createdPreview);

            setImagePreview(null);
            setDocPreview(createdPreview);
          } else {
            console.log("failed to make file preview");
          }
        }
      } else {
        console.log("uploadedFile not found");
      }
    },
    []
  );

  //Send  Messages (POST request)
  const sendMessage = useCallback(
    async (message: string) => {
      try {
        if (!(message || file) || !conversationId) {
          console.error("message, conversationId required");
          return;
        }

        // solo message
        if (!file) {
          const response = await api.post(
            "/message/send",
            {
              conversationId,
              message: message.trim(),
              senderId: currentUserId,
            },
            { signal: controller.signal }
          );
          // console.log("response solo message", response.data);
          if (response.data) {
            dispatch(addMessage(response.data.message));
            socket.emit("sendMessage", response.data.message);
          }
          return;
        }

        // file upload message
        const sender = currentUserId;
        const text = message || "";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("sender", sender); // Add the sender field
        formData.append("conversationId", conversationId); // Add the conversation ID
        formData.append("text", text);
        console.log("file", formData);

        const response = await api.post("/upload/message", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response ", response.data);
        if (response.data) {
          dispatch(addMessage(response.data.message));
          socket.emit("send-message", response.data.message);
        }
      } catch (error) {
        axiosError(error);
      }
    },
    [file, conversationId, currentUserId, api]
  );

  //Delete  Messages (DELETE request)

  const [deleteData, deleteLoading, deleteError, deleteMessage, ,] =
    useFetchData<SUCCESS_RESPONSE>("message/delete", "DELETE");

  const handleDeleteMessage = useCallback(async () => {
    if (!(selectedMessageIds.length > 0)) {
      console.log("provide array of messages id");

      return;
    }

    deleteMessage({
      data: {
        messageIds: selectedMessageIds,
        userId: currentUserId,
      },
    });
  }, [currentUserId, selectedMessageIds]);

  useEffect(() => {
    if (deleteData && selectedMessageIds.length > 0) {
      dispatch(removeMessages(selectedMessageIds));
      socket.emit("remove-message", selectedMessageIds);

      // clearAllSelectedMessage();
    }
  }, [deleteData, dispatch]);

  useEffect(() => {
    if (deleteError && !deleteLoading) {
      toast.error("failed to delete");
    }
  }, [deleteError]);

  useEffect(() => {
    return () => {
      controller.abort();
      clearAllSelectedMessage();
    };
  }, []);

  return {
    handleFileChange,
    sendMessage,
    imagePreview,
    docPreview,
    resetDocPreview,
    resetImagePreview,
    resetMedia,
    handleDeleteMessage,
    deleteLoading,
  };
};

export default useMessage;
