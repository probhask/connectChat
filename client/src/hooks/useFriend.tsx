import { CONVERSATION, FRIEND, SUCCESS_RESPONSE } from "types";
import { addInitialFriendData, removeFriend } from "@store/slices/friends";
import { useCallback, useEffect, useState } from "react";
import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";

import toast from "react-hot-toast";
import useChatAppContext from "@context/index";
import useFetchData from "./useFetchData";

const useFriend = () => {
  const currentUserId = useChatAppSelector((store) => store.auth._id);
  const dispatch = useChatAppDispatch();

  const [removeFriendId, setRemoveFriendId] = useState<string | null>(null);
  const [conversationFriendId, setConversationFriendId] = useState<
    string | null
  >(null);
  const { updateConversationRoomId, showConversationTab } = useChatAppContext();

  // Fetch Friends Request (GET Request)
  const [friendData, friendLoading, friendError, , abortFriends] = useFetchData<
    FRIEND[]
  >(
    "/user/friend",
    "GET",
    {
      params: {
        userId: currentUserId,
      },
    },
    true
  );

  useEffect(() => {
    if (friendData) {
      dispatch(addInitialFriendData(friendData)); // add initial friend data to redux
    }
  }, [friendData, dispatch]);

  // Unfriend Request
  const [
    unfriendData,
    unfriendLoading,
    unfriendError,
    unfriendUser,
    abortUnfriend,
  ] = useFetchData<SUCCESS_RESPONSE>("/user/unfriend", "DELETE", {}, false);

  const handleUnfriendUser = useCallback(
    async (friendId: string) => {
      if (friendId) {
        setRemoveFriendId(friendId);
        unfriendUser({
          data: {
            userId: currentUserId,
            friendId: friendId,
          },
        });
      }
    },
    [currentUserId, unfriendUser]
  );
  useEffect(() => {
    if (unfriendData && unfriendData.success && removeFriendId) {
      dispatch(removeFriend(removeFriendId)); // remove friend fromm redux
      setRemoveFriendId(null); // clear friendId
      toast.success("Removed successfully");
    }
  }, [unfriendData, dispatch, removeFriendId]);

  useEffect(() => {
    if (unfriendError && !unfriendLoading) {
      toast.error("Failed to remove");
    }
  }, [unfriendError, unfriendLoading]);

  // enter conversation room
  const [
    conversationRoomData,
    conversationRoomLoading,
    conversationRoomError,
    findConversationRoom,
    abortConversationRoom,
  ] = useFetchData<CONVERSATION>("/conversation/room", "GET", {}, false);

  const handleFindConversationRoom = useCallback(
    async (friendId: string) => {
      if (friendId) {
        setConversationFriendId(friendId);
        findConversationRoom({
          params: {
            userIds: [currentUserId, friendId],
          },
        });
      }
    },
    [currentUserId, findConversationRoom]
  );

  useEffect(() => {
    if (
      conversationRoomData &&
      conversationRoomData._id &&
      conversationFriendId
    ) {
      updateConversationRoomId(conversationRoomData._id);
      showConversationTab();
      setConversationFriendId(null);
    }
  }, [
    conversationRoomData,
    conversationFriendId,
    updateConversationRoomId,
    showConversationTab,
  ]);

  useEffect(() => {
    if (conversationRoomError && !conversationRoomLoading) {
      toast.error("error connecting conversation");
    }
  }, [conversationRoomError, conversationRoomLoading]);

  //   abort all request
  useEffect(() => {
    return () => {
      abortFriends();
      abortUnfriend();
      abortConversationRoom();
    };
  }, []);

  return {
    friendLoading,
    friendError,
    abortFriends,

    unfriendLoading,
    unfriendError,
    removeFriendId,
    handleUnfriendUser,
    abortUnfriend,
    conversationRoomLoading,
    handleFindConversationRoom,
    conversationFriendId,
  };
};

export default useFriend;
