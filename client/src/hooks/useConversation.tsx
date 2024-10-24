import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";

import { addInitialConversationRoomData } from "@store/slices/conversation";
import axiosError from "@utils/AxiosError/axiosError";
import { useCallback } from "react";
import useRefresh from "./useRefresh";

const useConversation = () => {
  const dispatch = useChatAppDispatch();
  const userId = useChatAppSelector((store) => store.auth._id);
  const api = useRefresh();
  const fetchConversation = useCallback(
    async (conversationRoomId: string) => {
      try {
        if (!conversationRoomId || !userId) {
          console.error("conversationRoomId and userId are required");
        }

        const conversationApi = api.get("/conversation", {
          params: {
            conversationId: conversationRoomId,
            userId: userId,
          },
        });
        const messageApi = api.get("/message", {
          params: {
            conversationId: conversationRoomId,
          },
        });

        const [conversation, messages] = await Promise.all([
          conversationApi,
          messageApi,
        ]);
        dispatch(
          addInitialConversationRoomData({
            conversation: conversation.data,
            messages: messages.data,
          })
        );
      } catch (error) {
        console.error("error in fetch Conversation Room", error);
        axiosError(error);
      }
    },
    [dispatch, userId]
  );

  return { fetchConversation };
};

export default useConversation;
