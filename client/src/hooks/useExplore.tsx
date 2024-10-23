import { FRIEND_REQUEST, SHORT_USER } from "types";
import { addInitialUserData, removeUser } from "@store/slices/exploreUsers";
import { useCallback, useEffect, useState } from "react";
import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";

import { addSentRequest } from "@store/slices/friendRequest";
import toast from "react-hot-toast";
import useFetchData from "./useFetchData";

type ExploreUser = {
  users: SHORT_USER[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
};

const limit = 10;

const useExplore = () => {
  const currentUserId = useChatAppSelector((store) => store.auth._id);
  const [page, setPage] = useState(1);
  const dispatch = useChatAppDispatch();
  const [isMoreAvailable, setIsMoreAvailable] = useState(false);
  const [currentReceiverId, setCurrentReceiverId] = useState<string | null>(
    null
  );

  const [
    exploreData,
    exploreLoading,
    exploreError,
    exploreFetchData,
    exploreAbort,
  ] = useFetchData<ExploreUser>(
    "/user/explore",
    "GET",
    {
      params: {
        userId: currentUserId,
        page,
        limit,
      },
    },
    true
  );
  const fetchUsers = useCallback(async () => {
    exploreFetchData();
  }, [exploreFetchData]);

  useEffect(() => {
    if (exploreData) {
      dispatch(addInitialUserData([...exploreData.users]));
    }
    if (exploreData) {
      if (exploreData.currentPage >= exploreData.totalPages) {
        setIsMoreAvailable(false);
      } else {
        setIsMoreAvailable(true);
      }
    }
  }, [exploreData, dispatch]);

  const [
    sendRequestData,
    sendRequestLoading,
    sendRequestError,
    sendRequestFetchData,
    sendRequestAbort,
  ] = useFetchData<FRIEND_REQUEST>("/friendRequest/send", "POST", {}, false);
  const sendFriendRequest = useCallback(
    async (receiverId: string) => {
      if (receiverId) {
        setCurrentReceiverId(receiverId);
        sendRequestFetchData({
          data: {
            sender: currentUserId,
            receiver: receiverId,
          },
        });
      }
    },
    [sendRequestFetchData, currentUserId]
  );

  useEffect(() => {
    if (sendRequestData && sendRequestData._id && currentReceiverId) {
      console.log("friend request sent successfully ...", sendRequestData);
      dispatch(addSentRequest(sendRequestData));
      dispatch(removeUser(currentReceiverId));
      setCurrentReceiverId(null);
      toast.success("Request sent successfully");
    }
  }, [sendRequestData, dispatch, currentReceiverId]);

  useEffect(() => {
    if (sendRequestError && !sendRequestLoading) {
      toast.error("Failed to send request");
    }
  }, [sendRequestError, sendRequestLoading]);

  useEffect(() => {
    return () => {
      sendRequestAbort();
      exploreAbort();
    };
  }, []);

  return {
    fetchUsers,
    exploreLoading,
    exploreError,
    page,
    isMoreAvailable,
    sendFriendRequest,
    friendRequestReceiver: currentReceiverId,
    sendRequestLoading,
    sendRequestError,
    setPage,
  };
};

export default useExplore;
