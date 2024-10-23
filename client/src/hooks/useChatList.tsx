import { useCallback, useEffect } from "react";
import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";

import { CHAT_LIST } from "types";
import { addInitialChatList } from "@store/slices/chatList";
import useFetchData from "./useFetchData";

const useChatList = () => {
  const currentUserId = useChatAppSelector((store) => store.auth._id);
  const dispatch = useChatAppDispatch();

  const [
    chatListData,
    chatListLoading,
    chatListError,
    fetchChatList,
    abortFetchChatList,
  ] = useFetchData<CHAT_LIST[]>(
    "/chatlist",
    "GET",
    {
      params: {
        userId: currentUserId,
      },
    },
    false
  );
  const handleFetchChatList = useCallback(async () => {
    fetchChatList();
  }, [fetchChatList]);

  useEffect(() => {
    if (chatListData) {
      dispatch(addInitialChatList(chatListData)); //add to redux
    }
  }, [chatListData]);

  useEffect(() => {
    return () => {
      abortFetchChatList();
    };
  }, []);

  return {
    chatListLoading,
    chatListError,
    abortFetchChatList,
    handleFetchChatList,
  };
};

export default useChatList;
