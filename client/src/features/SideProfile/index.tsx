import { ErrorState, LoadingState } from "@components/FetchingStates";
import React, { useEffect, useMemo } from "react";
import { Stack, styled } from "@mui/material";

import EmptyMessage from "@components/EmptyMessage";
import RelatedUsers from "./RelatedUsers";
import TopNavigateBtn from "./TopNavigateBtn";
import { USER } from "types";
import UserInfo from "./UserInfo";
import useChatAppContext from "@context/index";
import { useChatAppSelector } from "@store/hooks";
import { useLocation } from "react-router-dom";
import useSideProfile from "@hooks/useSideProfile";

const SideProfile = React.memo(() => {
  const { isGroupProfile, userProfileId, profileTab } = useChatAppContext();
  const sideProfileData = useChatAppSelector((store) => store.sideProfile);
  const profile = useChatAppSelector((store) => store.sideProfile);
  const location = useLocation();

  const data = useMemo(() => {
    if (profile && profile.length > 0) {
      if ("isMember" in profile[0]) {
        return profile[0];
      } else if ("isFriend" in profile[0]) {
        return profile[0];
      }
    }
  }, [profile]);

  const profileData: {
    url: string;
    name: string;
    additionalText: string;
    users: USER[];
    profileId: string;
  } = useMemo(() => {
    if (data) {
      // profile is group
      if ("isMember" in data) {
        return {
          url: data.group?.group_picture?.fileName || "",
          name: data.group.groupName,
          additionalText: `${data.group.participants?.length || 0} members`,
          users: data.group.participants ?? [],
          profileId: data.group._id,
        };
      } else {
        return {
          url: data?.user?.profile_picture?.fileName || "",
          name: data?.user.username,
          additionalText: data?.user.email,
          users: data?.user?.friends ?? [],
          profileId: data.user._id,
        };
      }
      // Default return if data is not valid
    }
    return {
      url: "",
      name: "Unknown",
      additionalText: "",
      users: [],
      profileId: "",
    };
  }, [data]);

  // const btnStatus = useMemo(() => {
  //   if (data) {
  //     if ("isMember" in data) {
  //       return data?.isMember;
  //     } else {
  //       return data?.isFriend;
  //     }
  //   }
  //   return false;
  // }, [data]);
  const isGroup = useMemo(() => {
    if (data) {
      if (data.type === "GROUP_PROFILE") {
        return true;
      }
      return false;
    }
    return false;
  }, [data]);

  const {
    handleFetchProfileData,
    profileError,
    profileLoading,
    abortProfileFetch,
  } = useSideProfile();

  useEffect(() => {
    if (
      userProfileId &&
      ((location.pathname === "/" && profileTab) || window.innerWidth > 600)
    ) {
      handleFetchProfileData(userProfileId, isGroupProfile);
    }
    return () => {
      abortProfileFetch();
    };
  }, [userProfileId, isGroupProfile, location.pathname]);

  return (
    <ProfileInfoContainer>
      {sideProfileData?.length > 0 && (
        <>
          <TopNavigateBtn />
          <UserInfo
            url={profileData?.url}
            name={profileData?.name}
            additionalText={profileData?.additionalText}
          />
          {/* <MediaList /> */}
          {/* <div style={{ flex: 1 }} /> */}
          {profileData?.users && (
            <RelatedUsers users={profileData.users} isGroup={isGroup} />
          )}
          {/* {data?.type && (
            <ActionButtons
              type={data?.type}
              btnStatus={btnStatus}
              profileId={profileData.profileId}
            />
          )} */}
        </>
      )}
      {!profileLoading && sideProfileData?.length === 0 && (
        <EmptyMessage
          primaryText="Select a profile"
          // secondaryText="To view profile details"
        />
      )}
      {profileLoading && sideProfileData?.length === 0 && <LoadingState />}
      {!profileLoading && profileError && userProfileId && (
        <ErrorState error={"unable to load data"} />
      )}
    </ProfileInfoContainer>
  );
});
SideProfile.displayName = "SideProfile";

export default SideProfile;

const ProfileInfoContainer = styled(Stack)({
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  overflowY: "auto",
  backgroundColor: "var(--color-light)",
  position: "relative",
});
