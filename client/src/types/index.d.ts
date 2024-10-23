export * from "./reduxStore";

export type USER = {
  _id: string;
  username: string;
  email: string;
  friends: USER[];
  profile_picture: MEDIA_TYPE | null;
  isOnline: boolean;
  lastSeen: Date | undefined;
  createdAt: Date;
};

export type SHORT_USER = {
  _id: string;
  username: string;
  profile_picture: MEDIA_TYPE | null;
};
export type AUTH = {
  _id: string;
  username: string;
  email: string;
  profile_picture: MEDIA_TYPE | null;
  accessToken: string;
};

export type USER = Omit<AUTH, "accessToken"> & {
  isOnline: boolean;
  lastSeen: Date | undefined;
};

export type MESSAGE_STATUS = {
  user: string;
  isReceived: boolean;
  isRead: boolean;
};
export type MEDIA_TYPE = {
  _id: string;
  path: string;
  fullPath: string;
  originalName: string;
  fileName: string;
  mimetype: string;
};

export type MESSAGE = {
  _id: string;
  conversationId: string;
  sender: SHORT_USER;
  text: string;
  media: MEDIA_TYPE | null;
  isSent: boolean;
  status: MESSAGE_STATUS[];
  createdAt: Date;
  updateAt?: Date;
};

export type CONVERSATION = {
  _id: string;
  // participants: string[] | Omit<USER, "email" | "createdAt">[];
  participants: string[] | USER;
  isGroupChat: boolean;
  groupName: string;
  group_picture: MEDIA_TYPE | null;
};

export type CHAT_LIST = {
  conversation: CONVERSATION;
  lastMessage: {
    text: string;
    sender: string;
    media: string;
  };
  otherUser: {
    _id: string;
    username: string;
    isOnline: false;
    profile_picture: MEDIA_TYPE | null;
    lastSeen: Date | undefined;
  };
};

export type CONVERSATION_ROOM = {
  conversation: CONVERSATION;
  messages: MESSAGE[];
};

export type FRIEND_REQUEST_STATUS = "pending" | "accepted" | "rejected";

export type FRIEND_REQUEST = {
  _id: string;
  sender: SHORT_USER;
  receiver: SHORT_USER;
  status: FRIEND_REQUEST_STATUS;
  createdAt: Date | undefined;
};

export type FRIEND = SHORT_USER & {
  isOnline: boolean;
};

export type DOC_PREVIEW = { extension: string; name: string };
export type SUCCESS_RESPONSE = { message: string; success: boolean };
export type TAB_FRIENDS_REQUEST = "sent" | "received";

export type SIDE_PROFILE_CONVERSATION = {
  _id: string;
  // participants: string[] | Omit<USER, "email" | "createdAt">[];
  participants: USER[];
  isGroupChat: boolean;
  groupName: string;
  group_picture: MEDIA_TYPE | null;
};

type GROUP_PROFILE = {
  isMember: boolean;
  group: SIDE_PROFILE_CONVERSATION;
  type: "GROUP_PROFILE";
};
type USER_PROFILE = {
  isFriend: boolean;
  user: USER;
  type: "USER_PROFILE";
};
export type SideProfileApiResponse = GROUP_PROFILE | USER_PROFILE;
