import { useCallback, useEffect } from "react";
import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";

import { SideProfileApiResponse } from "types";
import { addInitialSideProfile } from "@store/slices/sideProfile";
import useFetchData from "./useFetchData";

const useSideProfile = () => {
  const userId = useChatAppSelector((store) => store.auth._id);
  const dispatch = useChatAppDispatch();

  const [
    profileData,
    profileLoading,
    profileError,
    fetchProfileData,
    abortProfileFetch,
  ] = useFetchData<SideProfileApiResponse>("/profile", "GET");

  const handleFetchProfileData = useCallback(
    async (userProfileId: string, isGroupProfile: boolean) => {
      if (!userProfileId) {
        console.log("profile id not found");
      }
      fetchProfileData({
        params: {
          profileId: userProfileId,
          isGroup: isGroupProfile,
          userId,
        },
      });
    },
    [fetchProfileData, userId]
  );

  useEffect(() => {
    if (profileData && !profileLoading) {
      dispatch(addInitialSideProfile(profileData));
    }
  }, [profileData, profileLoading, dispatch]);

  useEffect(() => {
    if (profileError && !profileLoading) {
      console.log("failed to fetch profile detail");
    }
  }, [profileError, profileLoading]);

  useEffect(() => {
    return () => {
      abortProfileFetch();
    };
  }, []);

  return {
    profileLoading,
    profileError,
    handleFetchProfileData,
    abortProfileFetch,
  };
};

export default useSideProfile;
