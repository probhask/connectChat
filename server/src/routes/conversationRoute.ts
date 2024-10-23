import {
  addParticipantsToConversation,
  createConversation,
  deleteConversation,
  getConversation,
  getConversationRoom,
  removeParticipantsFromConversation,
} from "../controllers/conversationController";

import express from "express";

const router = express.Router();

router.get("/", getConversation);
router.get("/room", getConversationRoom);
router.post("/", createConversation);
router.put("/add", addParticipantsToConversation);
router.put("/remove", removeParticipantsFromConversation);
router.delete("/delete", deleteConversation);

export default router;
