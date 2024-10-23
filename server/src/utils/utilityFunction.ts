import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// generate access Token
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
};
// generate refresh Token
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.Refresh_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
};

// catch error response
export const catchErrorResponse = (res: Response, error: unknown) => {
  return res.status(500).json({
    message:
      error instanceof Error
        ? error.message
        : "Server error .Please try again!",
  });
};

// Utility function to send error response
export const sendErrorResponse = (
  res: Response,
  status: number,
  message: string
) => {
  return res.status(status).json({ success: false, message: message });
};
// success response
export const sendSuccessResponse = (res: Response, message: string) => {
  return res.status(200).json({ success: true, message: message });
};

// cookie name
export const REFRESH_TOKEN_NAME = "chat_app_jwt_refresh_token";
// cookie expiration
export const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds

//clear cookie
export const clearRefreshToken = (res: Response) => {
  res.clearCookie(REFRESH_TOKEN_NAME, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

// validate mongoose id
export const isValidObjectId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};
