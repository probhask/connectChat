import mongoose, { Document, Schema } from "mongoose";

import { IUser } from "./user";

export interface IFriendRequest extends Document {
  sender: IUser["_id"];
  receiver: IUser["_id"];
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updateAt: Date;
}

const friendRequestSchema: Schema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FriendRequest = mongoose.model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema
);
export default FriendRequest;
