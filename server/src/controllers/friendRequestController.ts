import FriendRequest, { IFriendRequest } from "../models/friendRequest";
import { Request, Response } from "express";

import User from "../models/user";
import mongoose from "mongoose";

export const getFriendRequest = async (req: Request, res: Response) => {
  try {
    const { userId, requestType = "" } = req.query;

    if (!userId) {
      console.log("Please provide userId");
      res.status(400).json({ message: "Please provide userId" });
      return;
    }
    const friendRequest = await FriendRequest.find({
      $or: [{ sender: userId }, { receiver: userId }],
      status: "pending",
    })
      .populate({
        path: "sender",
        select: "username _id profile_picture ",
        populate: {
          path: "profile_picture",
          model: "Upload",
          select: "path _id mimetype originalName fileName fullPath",
        },
      })
      .populate({
        path: "receiver",
        select: "username _id profile_picture ",
        populate: {
          path: "profile_picture",
          model: "Upload",
          select: "path _id mimetype originalName fileName fullPath",
        },
      })
      .exec();
    const received: IFriendRequest[] = [];
    const sended: IFriendRequest[] = [];
    const userObjectId = new mongoose.Types.ObjectId(userId as string);

    if (requestType === "SEND") {
      for (const request of friendRequest) {
        // request sender id
        const requestSenderId = request.sender as mongoose.Types.ObjectId;
        if (requestSenderId.equals(userObjectId)) {
          sended.push(request);
        }
      }
      res.status(201).json(sended);
      return;
    } else if (requestType === "RECEIVE") {
      for (const request of friendRequest) {
        // request sender id
        const requestSenderId = request.sender as mongoose.Types.ObjectId;
        if (!requestSenderId.equals(userObjectId)) {
          received.push(request);
        }
      }
      res.status(200).json(received);
      return;
    }

    // requestType none
    for (const request of friendRequest) {
      // request sender id
      const requestSenderId = request.sender as mongoose.Types.ObjectId;
      if (requestSenderId.equals(userObjectId)) {
        sended.push(request);
      } else {
        received.push(request);
      }
    }
    res.status(200).json({ sended, received });
    return;
  } catch (err) {
    res.status(500).json({
      message:
        err instanceof Error ? err.message : "Server error, please try again",
    });
  }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { sender: senderId, receiver: receiverId } = req.body;
    // if sender and receiver id not provided
    if (!senderId || !receiverId) {
      console.log("Please provide both sender and receiver id");

      res
        .status(404)
        .json({ message: "Please provide both sender and receiver id" });
      return;
    }
    // if not already sended
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
      status: "pending",
    });
    if (existingRequest) {
      console.log("Friend request already sent");
      res.status(409).json({ message: "Friend request already exists" });
      return;
    }

    const newRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });
    const populatedRequest = await (
      await newRequest.populate("receiver", "_id profile_picture username")
    ).populate("sender", "_id profile_picture username");

    if (populatedRequest) {
      res.status(200).json(populatedRequest);
      return;
    } else {
      res.status(500).json({ message: "Server error, please try again" });
    }
  } catch (err) {
    res.status(500).json({
      message:
        err instanceof Error ? err.message : "Server error, please try again",
    });
  }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.body;
    console.log(requestId);

    // validate requestId
    if (!requestId || !mongoose.Types.ObjectId.isValid(requestId as string)) {
      res.status(400).json({ message: "Invalid or missing request id" });
      return;
    }
    // find request
    const request = await FriendRequest.findById(requestId);

    // if request not found
    if (!request) {
      console.log("Friend request not found");
      res.status(404).json({ message: "Friend request not found" });
      return;
    }
    const { sender, receiver } = request;

    // find sender detail
    const senderUser = await User.findById(sender).select(
      "_id username profile_picture isOnline"
    );

    if (!senderUser) {
      console.log("Sender user not found");
      res.status(404).json({ message: "Sender user not found" });
      return;
    }

    const [user1Update, user2Update] = await Promise.all([
      User.findByIdAndUpdate(sender, {
        $addToSet: { friends: receiver },
      }),
      User.findByIdAndUpdate(receiver, {
        $addToSet: { friends: sender },
      }),
    ]);
    // if both user were updated
    if (user1Update && user2Update) {
      await FriendRequest.findByIdAndDelete(requestId);
      console.log("Friendship accepted request successfully");
      res.status(200).json({ user: senderUser });
      return;
    } else {
      res.status(500).json({ message: "Failed to update Friends list" });
    }
  } catch (err) {
    res.status(500).json({
      message:
        err instanceof Error ? err.message : "Server error, please try again",
    });
  }
};
export const cancelFriendRequest = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.body;
    // if request id not provided
    if (!requestId || !mongoose.Types.ObjectId.isValid(requestId as string)) {
      console.log("Invalid or missing requestId received");
      res
        .status(400)
        .json({ message: "Invalid or missing requestId received" });
      return;
    }

    const request = await FriendRequest.findByIdAndDelete(requestId);
    if (request) {
      console.log("Friend request cancelled successfully");

      res
        .status(200)
        .json({ message: "Friend request cancelled successfully" });
      return;
    } else {
      console.log("Friend request not found");
      res.status(404).json({ message: "Friend request not found" });
    }
  } catch (err) {
    console.error("error during canceling friend request");

    res.status(500).json({
      message:
        err instanceof Error ? err.message : "Server error, please try again",
    });
  }
};
