import {
  deleteMessages,
  getMessage,
  sendMessage,
  updateMessageStatus,
} from "../controllers/messageController";

import express from "express";

const router = express.Router();

// get messages from conversation id
router.get("/", getMessage);
// send message
router.post("/send", sendMessage);
// delete message(s)
router.delete("/delete", deleteMessages);
// update message status isReceived, isRead
router.put("/status", updateMessageStatus);

//get unread message count

export default router;
