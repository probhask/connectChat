import express from "express";
import { getChatList } from "../controllers/chatListController";

const router = express.Router();
router.get("/", getChatList);

export default router;
