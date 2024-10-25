import type { CANCEL_TYPE, TAB_FRIENDS_REQUEST } from "types";
import React, { createContext, useContext } from "react";

import useFriendRequest from "@hooks/useFriendRequest";

type FriendRequestContextType = {
  acceptLoading: boolean;
  acceptError: string | null;
  handleAcceptRequest: (requestId: string) => Promise<void>;
  acceptRequestId: string | null;
  abortAcceptRequest: () => void;
  cancelLoading: boolean;
  cancelError: string | null;
  handleCancelRequest: (
    requestId: string,
    cancelType: CANCEL_TYPE
  ) => Promise<void>;
  cancelRequestId: string | null;
  abortCancelRequest: () => void;
  receivedLoading: boolean;
  receivedError: string | null;
  handleFetchReceivedRequest: () => Promise<void>;
  abortReceivedRequests: () => void;
  sentLoading: boolean;
  sentError: string | null;
  handleFetchSentRequest: () => Promise<void>;
  abortSentRequest: () => void;
  tab: TAB_FRIENDS_REQUEST;
  changeTab: (tab: TAB_FRIENDS_REQUEST) => void;
};

export const FriendRequestContext = createContext<
  FriendRequestContextType | undefined
>(undefined);

export const FriendRequestContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    //accept frind request
    acceptLoading,
    acceptError,
    handleAcceptRequest,
    acceptRequestId,
    abortAcceptRequest,

    // cancel Request
    cancelLoading,
    cancelError,
    handleCancelRequest,
    cancelRequestId,
    abortCancelRequest,

    // fetch received friends request
    receivedLoading,
    receivedError,
    handleFetchReceivedRequest,
    abortReceivedRequests,

    //fetch sent request
    sentLoading,
    sentError,
    handleFetchSentRequest,
    abortSentRequest,

    //tabs
    tab,
    changeTab,
  } = useFriendRequest();

  const values = {
    // accept Friend request
    acceptLoading,
    acceptError,
    handleAcceptRequest,
    acceptRequestId,
    abortAcceptRequest,

    // cancel Request
    cancelLoading,
    cancelError,
    handleCancelRequest,
    cancelRequestId,
    abortCancelRequest,

    // fetch received friends request
    receivedLoading,
    receivedError,
    handleFetchReceivedRequest,
    abortReceivedRequests,

    //fetch sent request
    sentLoading,
    sentError,
    handleFetchSentRequest,
    abortSentRequest,

    //tabs
    tab,
    changeTab,
  };

  return (
    <FriendRequestContext.Provider value={values}>
      {children}
    </FriendRequestContext.Provider>
  );
};

const useFriendRequestContext = () => {
  const context = useContext(FriendRequestContext);
  if (!context) {
    throw new Error(
      "useFriendRequestContext hook must be used within FriendRequestContextProvider"
    );
  }
  return context;
};

export default useFriendRequestContext;
