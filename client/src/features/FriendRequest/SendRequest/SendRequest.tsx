import { ErrorState, LoadingState } from "@components/FetchingStates";

import ActionProfilePreview from "@components/ActionProfilePreview";
import { Cancel } from "@mui/icons-material";
import EmptyMessage from "@components/EmptyMessage";
import { Stack } from "@mui/material";
import { useChatAppSelector } from "@store/hooks";
import { useEffect } from "react";
import useFriendRequest from "@hooks/useFriendRequest";

const SendRequest = () => {
  const req = useChatAppSelector((store) => store?.friendRequest?.sended);
  const {
    sentLoading,
    sentError,
    abortSentRequest,
    handleCancelRequest,
    cancelLoading,
    cancelRequestId,
    abortCancelRequest,
  } = useFriendRequest();

  useEffect(() => {
    return () => {
      if (abortSentRequest) {
        abortSentRequest();
      }
      if (abortCancelRequest) {
        abortCancelRequest();
      }
    };
  }, [abortSentRequest, abortCancelRequest]);

  return (
    <Stack
      direction="column"
      className="hide-scrollbar"
      sx={{
        overflowY: "auto",
      }}
    >
      {!sentLoading && sentError && (
        <ErrorState error={"unable to fetch data"} />
      )}
      {!sentError &&
        req &&
        req?.length > 0 &&
        req?.map(({ _id, receiver }) => {
          const { _id: receiverId, profile_picture, username } = receiver;
          const cancelingRequest = cancelLoading && cancelRequestId === _id;

          if (receiverId) {
            return (
              <ActionProfilePreview
                key={_id}
                userId={receiverId}
                imageSrc={
                  profile_picture?.fileName ? profile_picture?.fileName : ""
                }
                username={username}
                buttons={[
                  {
                    text: cancelingRequest ? "..." : "CANCEL",
                    themeColor: "#C62E2E",
                    icon: cancelingRequest ? (
                      ""
                    ) : (
                      <Cancel sx={{ width: "15px", height: "auto" }} />
                    ),
                    handleClick: () => handleCancelRequest(_id, "SEND"),
                  },
                ]}
              />
            );
          }
        })}

      {!sentError && !sentLoading && req?.length === 0 && (
        <EmptyMessage
          primaryText="No sent friend request"
          secondaryText="You haven't sent any friend requests yet. Find people you know and connect with them"
          buttonText="Find Friends"
          navigateTo="/explore"
        />
      )}

      {sentLoading && <LoadingState message="loading sent request" />}
    </Stack>
  );
};

export default SendRequest;
