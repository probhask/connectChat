import express, { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: string;
}

const verifyJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // console.log("verifyJWT: start");
  const authHeader = req.headers["authorization"] as string | undefined;

  if (!authHeader) {
    // console.error(" verify jwt:access token not provided");
    res.status(401).json({ message: "Access Token not found" }); //unauthorized
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    `${process.env.ACCESS_TOKEN_SECRET}` as string,
    (err: any, decoded: any) => {
      if (err) {
        console.error(" verify jwt:Invalid Access Token");
        res.status(403).json({ message: "Invalid Access Token" }); // invalid token
        return;
      }
      req.user = decoded.username;
      // console.log("verifyJWT: verified");
      next();
    }
  );
};
export default verifyJWT;
