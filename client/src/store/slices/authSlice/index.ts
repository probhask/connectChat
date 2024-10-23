import { AUTH, MEDIA_TYPE } from "types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, storeToLocalStorage } from "@utils/localStorage";

const auth_InitialState: AUTH = {
  _id: getLocalStorage()?._id || "",
  username: getLocalStorage()?.username || "",
  email: getLocalStorage()?.email || "",
  profile_picture: getLocalStorage()?.profile_picture || null,
  accessToken: "",
};

const storeAuthDataToLocalStorage = (data: AUTH) => {
  if (data) {
    const { _id, username, email, profile_picture } = data;
    storeToLocalStorage({ _id, username, email, profile_picture });
  }
};

const authSlice = createSlice({
  initialState: auth_InitialState,
  name: "auth",
  reducers: {
    addAuthData: (state, action: PayloadAction<AUTH>) => {
      if (action.payload) {
        storeAuthDataToLocalStorage({ ...action.payload });
        return action.payload;
      }
      return state;
    },
    updateProfilePic: (state, action: PayloadAction<MEDIA_TYPE>) => {
      if (action.payload) {
        const updatedData = { ...state, profile_picture: action.payload };
        storeAuthDataToLocalStorage(updatedData);
        return updatedData;
      }
    },
    removeProfilePicture: (state) => {
      const updatedData = { ...state, profile_picture: null };
      storeAuthDataToLocalStorage(updatedData);
      console.log("image removed", updatedData);

      return updatedData;
    },
    updateAuthData: (
      state,
      action: PayloadAction<{ email: string; username: string }>
    ) => {
      if (action.payload) {
        const updatedData = { ...state, ...action.payload };
        storeAuthDataToLocalStorage(updatedData);
        return updatedData;
      }
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      const updatedData = { ...state, accessToken: action.payload };
      storeToLocalStorage({
        _id: updatedData._id,
        username: updatedData.username,
        email: updatedData.email,
        profile_picture: updatedData.profile_picture,
      });
      return updatedData;
    },
    logoutUser: () => {
      localStorage.removeItem("chatApp");
      sessionStorage.removeItem("conversation-tab");
      sessionStorage.removeItem("conversationRoomId");
      sessionStorage.removeItem("userProfileId");
      sessionStorage.removeItem("profile-tab");
      return {
        _id: "",
        username: "",
        email: "",
        profile_picture: null,
        accessToken: "",
      };
    },
  },
});
export const {
  addAuthData,
  updateAccessToken,
  updateProfilePic,
  removeProfilePicture,
  updateAuthData,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;
