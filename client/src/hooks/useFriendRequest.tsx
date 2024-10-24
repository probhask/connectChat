import { FRIEND, FRIEND_REQUEST, TAB_FRIENDS_REQUEST } from "types";
import {
  addInitialReceivedFriendRequestData,
  addInitialSentFriendRequestData,
  removeReceivedRequest,
  removeSentRequest,
} from "@store/slices/friendRequest";
import { getSessionStorage, storeToSessionStorage } from "@utils/localStorage";
import { useCallback, useEffect, useState } from "react";
import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";

import { addFriend } from "@store/slices/friends";
import toast from "react-hot-toast";
import useFetchData from "./useFetchData";

type CANCEL_TYPE = "SEND" | "RECEIVE";
type SENT_FRIEND_REQUEST = FRIEND_REQUEST[];
type RECEIVE_FRIEND_REQUEST = FRIEND_REQUEST[];

const useFriendRequest = () => {
  const dispatch = useChatAppDispatch();
  const currentUserId = useChatAppSelector((store) => store.auth._id);
  const [cancelRequestId, setCancelRequestId] = useState<string | null>(null);
  const [acceptRequestId, setAcceptRequestId] = useState<string | null>(null);
  const [cancelType, setCancelType] = useState<CANCEL_TYPE | null>(null);
  //------------------------------ send and receive tabs---------------------------//

  const [tab, setTab] = useState<TAB_FRIENDS_REQUEST>(
    getSessionStorage<TAB_FRIENDS_REQUEST>("tab-friend-request") || "received"
  );
  // handle tab change for friend request
  const changeTab = (tab: TAB_FRIENDS_REQUEST) => {
    storeToSessionStorage("tab-friend-request", tab);
    setTab(tab);
  };

  useEffect(() => {
    const tab = getSessionStorage<TAB_FRIENDS_REQUEST>("tab-friend-request");
    if (tab) {
      setTab(tab);
    } else {
      setTab("sent");
    }
  }, []);

  //------------------------------ sent friend  request---------------------------//
  // 1️⃣  Sent Friend Requests (GET Request)
  const [
    sentFriendReqData,
    sentLoading,
    sentError,
    fetchSentRequests,
    abortSentRequest,
  ] = useFetchData<SENT_FRIEND_REQUEST>(
    "/friendRequest",
    "GET",
    { params: { userId: currentUserId, requestType: "SEND" } },
    false
  );
  useEffect(() => {
    if (sentFriendReqData) {
      dispatch(addInitialSentFriendRequestData([...sentFriendReqData]));
    }
  }, [sentFriendReqData, dispatch]);

  const handleFetchSentRequest = useCallback(async () => {
    fetchSentRequests();
  }, [fetchSentRequests]);

  //2️⃣  Received Friend Requests (GET Request)
  const [
    receivedFriendReqData,
    receivedLoading,
    receivedError,
    fetchReceiveFriendRequests,
    abortReceivedRequests,
  ] = useFetchData<RECEIVE_FRIEND_REQUEST>(
    "/friendRequest",
    "GET",
    { params: { userId: currentUserId, requestType: "RECEIVE" } },
    false
  );

  useEffect(() => {
    if (receivedFriendReqData) {
      dispatch(addInitialReceivedFriendRequestData([...receivedFriendReqData]));
    }
  }, [receivedFriendReqData, dispatch]);

  const handleFetchReceivedRequest = useCallback(async () => {
    fetchReceiveFriendRequests();
  }, [fetchReceiveFriendRequests]);

  //------------------------------ received friend  request---------------------------//

  // 3️⃣   Accept Friend Requests (PUT Request)
  const [
    acceptFriendReqData,
    acceptLoading,
    acceptError,
    acceptFriendRequest,
    abortAcceptRequest,
  ] = useFetchData<{ user: FRIEND }>("/friendRequest", "PUT", {}, false);

  const handleAcceptRequest = useCallback(
    async (requestId: string) => {
      if (!requestId) {
        return;
      }
      setAcceptRequestId(requestId);
      acceptFriendRequest({
        data: {
          requestId,
        },
      });
    },
    [acceptFriendRequest]
  );
  useEffect(() => {
    if (acceptFriendReqData && acceptFriendReqData.user && acceptRequestId) {
      dispatch(addFriend(acceptFriendReqData.user)); // add friend in redux
      dispatch(removeReceivedRequest(acceptRequestId)); // remove receive request redux
      setAcceptRequestId(null); // remove accept request id
      toast.success("Friend added successfully");
    }
  }, [acceptFriendReqData, dispatch, acceptRequestId]);

  // toast error
  useEffect(() => {
    if (acceptError && !acceptLoading) {
      toast.error("Failed to Add Friend");
    }
  }, [acceptError, acceptLoading]);

  // 4️⃣ Cancel Friend Requests (DELETE Request)
  const [
    cancelFriendReqData,
    cancelLoading,
    cancelError,
    cancelFriendRequest,
    abortCancelRequest,
  ] = useFetchData<FRIEND>("/friendRequest", "DELETE", {}, false);

  const handleCancelRequest = useCallback(
    async (requestId: string, cancelType: CANCEL_TYPE) => {
      if (!requestId || !cancelType) {
        return;
      } else {
        setCancelType(cancelType);
        setCancelRequestId(requestId);
        cancelFriendRequest({
          data: {
            requestId,
          },
        });
      }
    },
    [cancelFriendRequest]
  );

  useEffect(() => {
    if (cancelFriendReqData && cancelRequestId && cancelType) {
      if (cancelType === "SEND") {
        dispatch(removeSentRequest(cancelRequestId)); //remove sent request from redux
      } else if (cancelType === "RECEIVE") {
        dispatch(removeReceivedRequest(cancelRequestId));
      }
      setCancelRequestId(null); // clear cancel request id
      setCancelType(null); //remove cancel type
      toast.success("Request removed successfully");
    }
  }, [cancelFriendReqData, dispatch, cancelRequestId, cancelType]);

  // toast error
  useEffect(() => {
    if (cancelError && !cancelLoading) {
      toast.error("Failed to remove request");
    }
  }, [cancelError, cancelLoading]);
  //   CleanUp Abort on Unmount
  useEffect(() => {
    return () => {
      abortSentRequest();
      abortReceivedRequests();
      abortCancelRequest();
      abortAcceptRequest();
    };
  }, []);

  return {
    tab,
    changeTab,

    handleFetchSentRequest,
    abortSentRequest,
    sentLoading,
    sentError,

    handleFetchReceivedRequest,
    abortReceivedRequests,
    receivedLoading,
    receivedError,

    handleAcceptRequest,
    acceptLoading,
    acceptError,
    acceptRequestId,
    abortAcceptRequest,

    handleCancelRequest,
    cancelLoading,
    cancelError,
    cancelRequestId,
    abortCancelRequest,
  };
};

export default useFriendRequest;
