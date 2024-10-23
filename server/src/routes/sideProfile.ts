import express from "express";
import { getSideProfileData } from "../controllers/sideProfileController";

const router = express.Router();

router.get("/", getSideProfileData);

export default router;
