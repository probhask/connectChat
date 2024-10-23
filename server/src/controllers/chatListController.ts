import { Request, Response } from "express";

import Conversation from "../models/conversation";
import { catchErrorResponse } from "../utils/utilityFunction";
import mongoose from "mongoose";

export const getChatList = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Invalid or missing userId." });
      return;
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Aggregation to get conversations with the last message, other user, and group details
    const conversations = await Conversation.aggregate([
      {
        $match: {
          participants: { $in: [userObjectId] }, // Find conversations including the current user
        },
      },
      {
        $lookup: {
          from: "messages",
          let: { conversationId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$conversationId", "$$conversationId"] },
              },
            },
            { $sort: { createdAt: -1 } }, // Sort messages by latest
            { $limit: 1 }, // Get only the latest message
          ],
          as: "lastMessage",
        },
      },
      {
        $unwind: {
          path: "$lastMessage",
          preserveNullAndEmptyArrays: true, // In case there are no messages
        },
      },
      // Lookup to find the "other" user if the conversation has two participants
      {
        $lookup: {
          from: "users",
          let: { participants: "$participants" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$_id", "$$participants"] }, // Match the participants
                    { $ne: ["$_id", userObjectId] }, // Exclude the current user
                  ],
                },
              },
            },
            { $limit: 1 }, // Limit to one other user
          ],
          as: "otherUser",
        },
      },
      {
        $unwind: {
          path: "$otherUser",
          preserveNullAndEmptyArrays: true, // In case it's a group chat or no other user
        },
      },
      //deep look up for profile picture
      {
        $lookup: {
          from: "uploads", // collection name
          localField: "otherUser.profile_picture", // field in other user to populate
          foreignField: "_id", // field in upload model to match with
          as: "otherUser.profile_picture_details", //output filed for populated profile picture details
        },
      },
      {
        $unwind: {
          path: "$otherUser.profile_picture_details",
          preserveNullAndEmptyArrays: true, // in vase there are no picture
        },
      },
      {
        $project: {
          conversation: {
            _id: "$_id",
            participants: "$participants",
            isGroupChat: "$isGroupChat",
            groupName: { $ifNull: ["$groupName", "Unknown"] },
            group_picture: { $ifNull: ["$groupPicture", ""] },
          },
          lastMessage: {
            text: { $ifNull: ["$lastMessage.text", "No Message yet"] },
            sender: { $ifNull: ["$lastMessage.sender", ""] },
            media: { $ifNull: ["$lastMessage.media", ""] },
            createdAt: "$lastMessage.createdAt",
          },
          otherUser: {
            _id: { $ifNull: ["$otherUser._id", ""] },
            username: { $ifNull: ["$otherUser.username", "Unknown"] },
            isOnline: { $ifNull: ["$otherUser.isOnline", false] },
            lastSeen: { $ifNull: ["$otherUser.lastSeen", undefined] },
            profile_picture: {
              originalName: {
                $ifNull: [
                  "$otherUser.profile_picture_details.originalName",
                  "",
                ],
              },
              fileName: {
                $ifNull: ["$otherUser.profile_picture_details.fileName", ""],
              },
              path: {
                $ifNull: ["$otherUser.profile_picture_details.path", ""],
              },
              fullPath: {
                $ifNull: ["$otherUser.profile_picture_details.fullPath", ""],
              },
              mimeType: {
                $ifNull: ["$otherUser.profile_picture_details.mimeType", ""],
              },
            },
          },
        },
      },
      { $sort: { "lastMessage.createdAt": -1 } }, //sort according to last message
    ]);
    res.status(201).json(conversations);
  } catch (error) {
    catchErrorResponse(res, error);
  }
};
