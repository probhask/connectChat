import {
  upload,
  uploadFile,
  uploadProfilePic,
} from "../controllers/uploadController";

import express from "express";
import path from "path";

const router = express.Router();
router.post("/message", upload.single("file"), uploadFile);
router.post("/profile-pic", upload.single("file"), uploadProfilePic);

export default router;
