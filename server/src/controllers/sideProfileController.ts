import { Request, Response } from "express";
import {
  catchErrorResponse,
  sendErrorResponse,
} from "../utils/utilityFunction";

import Conversation from "../models/conversation";
import User from "../models/user";
import { isValidObjectId } from "mongoose";

export const getSideProfileData = async (req: Request, res: Response) => {
  const { profileId, isGroup, userId } = req.query;

  if (
    !profileId &&
    !userId &&
    !isValidObjectId(profileId) &&
    !isValidObjectId(userId)
  ) {
    sendErrorResponse(res, 400, "Invalid profileId or isGroup or userId");
    return;
  }

  try {
    if (isGroup === "false") {
      // not group just user
      const user = await User.findById(profileId)
        .select("_id username profile_picture isOnline email lastSeen friends")
        .populate(
          "profile_picture",
          "path _id mimetype originalName fileName fullPath"
        )
        .populate({
          path: "friends",
          select: " _id username profile_picture",
          populate: {
            path: "profile_picture",
            select: "path _id mimetype originalName fileName fullPath",
          },
        });
      if (!user) {
        sendErrorResponse(res, 404, "User not found");
        return;
      }
      const currentUser = await User.findById(profileId).select("friends");
      const isFriend = currentUser?.friends.some(
        (id: any) => id.toString() === userId
      );

      res.status(200).json({ user, isFriend, type: "USER_PROFILE" });
      return;
    } else {
      // Find Group data

      const conversation = await Conversation.findById(profileId).populate({
        path: "participants",
        select: "username _id profile_picture isOnline lastSeen",
        populate: {
          path: "profile_picture",
          model: "Upload",
          select: "path _id mimetype originalName fileName fullPath",
        },
      });

      if (!conversation) {
        sendErrorResponse(res, 404, "Group not found");
        return;
      }

      const isMember = conversation?.participants.some((member: any) => {
        return String(member?._id) === String(userId);
      });

      res
        .status(200)
        .json({ group: conversation, isMember, type: "GROUP_PROFILE" });
      return;
    }
  } catch (error) {
    catchErrorResponse(res, error);
  }
};
