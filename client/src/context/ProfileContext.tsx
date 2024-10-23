import { MEDIA_TYPE, SUCCESS_RESPONSE } from "types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import {
  removeProfilePicture,
  updateAuthData,
  updateProfilePic,
} from "@store/slices/authSlice";
import { useChatAppDispatch, useChatAppSelector } from "@store/hooks";

import toast from "react-hot-toast";
import useFetchData from "@hooks/useFetchData";

type ProfileContextProps = {
  profilePicLoading: boolean;
  handleUploadProfilePic: (file: File) => void;
  abortUploadProfilePic: () => void;
  removePicLoading: boolean;
  handleRemoveProfilePic: () => void;
  abortRemoveProfilePic: () => void;
  updateProfileLoading: boolean;
  updateProfileError: string | null;
  handleUpdateProfileData: (username: string, email: string) => Promise<void>;
  abortUpdateProfile: () => void;
  handleUpdatePassword: (
    password: string,
    newPassword: string
  ) => Promise<void>;
  updatePasswordError: string | null;
  updatePasswordLoading: boolean;
};

export const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useChatAppSelector((store) => store.auth);

  const dispatch = useChatAppDispatch();

  //update profilePic (Post request)
  const [
    profilePicData,
    profilePicLoading,
    profilePicError,
    uploadProfilePic,
    abortUploadProfilePic,
  ] = useFetchData<MEDIA_TYPE>("/upload/profile-pic", "POST");

  const handleUploadProfilePic = useCallback(
    (file: File) => {
      if (!file) {
        console.log("file is requires");
        return;
      }
      console.log(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user._id);
      uploadProfilePic({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
    },
    [user._id, uploadProfilePic]
  );
  useEffect(() => {
    if (profilePicData && profilePicData._id) {
      dispatch(updateProfilePic(profilePicData));
      toast.success("picture updated");
    }
  }, [profilePicData, dispatch]);
  useEffect(() => {
    if (profilePicError && !profilePicLoading) {
      toast.error("Failed to update ProfilePic");
    }
  }, [profilePicError, profilePicLoading, dispatch]);

  //delete profilePic (delete request)
  const [
    removePicData,
    removePicLoading,
    removePicError,
    removeProfilePic,
    abortRemoveProfilePic,
  ] = useFetchData<SUCCESS_RESPONSE>("/user/profile-pic", "DELETE");

  const handleRemoveProfilePic = useCallback(() => {
    if (user.profile_picture) {
      removeProfilePic({
        params: {
          userId: user._id,
        },
      });
    }
  }, [user._id, removeProfilePic]);

  useEffect(() => {
    if (removePicData && removePicData.success) {
      dispatch(removeProfilePicture());
      toast.success("picture deleted");
    }
  }, [removePicData, dispatch]);
  useEffect(() => {
    if (removePicError && !removePicLoading) {
      toast.error("Failed to delete ProfilePic");
    }
  }, [removePicError, removePicLoading, dispatch]);

  const [
    profileData,
    updateProfileLoading,
    updateProfileError,
    updateProfile,
    abortUpdateProfile,
  ] = useFetchData<{
    username: string;
    email: string;
  }>("/user/update-profile-data", "PUT");

  const handleUpdateProfileData = useCallback(
    async (username: string, email: string) => {
      updateProfile({
        data: {
          userId: user._id,
          email,
          username,
        },
      });
    },
    [updateProfile, user._id]
  );

  useEffect(() => {
    if (profileData && profileData.email && !updateProfileLoading) {
      dispatch(updateAuthData(profileData));
      toast.success("Successfully Updated profile");
    }
  }, [profileData, updateProfileLoading, dispatch]);
  useEffect(() => {
    if (updateProfileError && !updateProfileLoading) {
      toast.error("Failed to update profile");
    }
  }, [updateProfileError, updateProfileLoading]);

  //password update
  const [
    updatePasswordResult,
    updatePasswordLoading,
    updatePasswordError,
    updatePassword,
    abortUpdatePassword,
  ] = useFetchData<SUCCESS_RESPONSE>("/user/update-password", "PUT");

  const handleUpdatePassword = useCallback(
    async (password: string, newPassword: string) => {
      updatePassword({
        data: {
          userId: user._id,
          password,
          newPassword,
        },
      });
    },
    [updatePassword, user._id]
  );

  useEffect(() => {
    if (
      updatePasswordResult &&
      updatePasswordResult.success &&
      !updatePasswordLoading
    ) {
      toast.success("Passwords updated successfully");
    }
  }, [updatePasswordResult, updatePasswordLoading, dispatch]);
  useEffect(() => {
    if (updatePasswordError && !updatePasswordLoading) {
      toast.error(`Error ${updatePasswordError}`);
    }
  }, [updatePasswordError, updatePasswordLoading]);

  const value = {
    //update profile pic
    profilePicLoading,
    handleUploadProfilePic,
    abortUploadProfilePic,

    //remove pic
    removePicLoading,
    handleRemoveProfilePic,
    abortRemoveProfilePic,

    //update profile
    updateProfileLoading,
    updateProfileError,
    handleUpdateProfileData,
    abortUpdateProfile,

    //update password
    handleUpdatePassword,
    updatePasswordError,
    updatePasswordLoading,
  };

  useEffect(() => {
    return () => {
      abortUpdateProfile();
      abortUpdatePassword();
      abortRemoveProfilePic();
      abortUploadProfilePic();
    };
  }, []);
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfileContext hook must be used within ProfileContextProvider"
    );
  }
  return context;
};

export default useProfileContext;
