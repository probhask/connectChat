import {
  acceptFriendRequest,
  cancelFriendRequest,
  getFriendRequest,
  sendFriendRequest,
} from "../controllers/friendRequestController";

import express from "express";

const router = express.Router();

router.get("/", getFriendRequest); //get users friend request
router.post("/send", sendFriendRequest); //send friend request
router.put("/", acceptFriendRequest); //accept friend request
router.delete("/", cancelFriendRequest); //accept friend request

//decline friend request reject //delete

export default router;
