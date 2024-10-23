import mongoose from "mongoose";
import { IConversation } from "../models/conversation";

type ConversationDataType = {
  conversation: IConversation;
  lastMessage: {
    content: string;
    sender: { _id: mongoose.Types.ObjectId; userName: string };
  };
  otherUser: {
    userName: string;
    isOnline: boolean;
  } | null;
};

export type SHORT_USER = {
  username: string;
  profile_picture: MEDIA_TYPE | null;
  _id: string;
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

// type USER = {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   profile_picture?: string;
//   friends?: string[];
//   createdAt: Date;
// };

// type CONVERSATION = {
//   _id: string;
//   userA_id: string;
//   userB_id: string;
// };

// type FRIEND = {
//   _id: string;
//   userA_id: string;
//   userB_id: string;
// };

// type FRIEND_REQUEST = {
//   _id: string;
//   sender_id: string;
//   receiver_id: string;
//   status: "pending" | "accepted" | "rejected";
//   createdAt: Date;
// };

// type MESSAGE = {
//   _id: string;
//   conversation_id: string;
//   message: string;
//   sender_id: string;
//   // create time
// };
