import mongoose, { Document, Schema } from "mongoose";

import { IUpload } from "./upload";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile_picture: IUpload["_id"];
  isOnline: Boolean;
  friends: IUser["_id"][];
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string;
}
const userSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: Schema.Types.ObjectId,
      ref: "Upload",
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: true,
    },
    lastSeen: {
      type: Date,
      default: Date.now(),
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;