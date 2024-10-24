import { Request, Response } from "express";

import Message from "../models/message";
import Upload from "../models/upload";
import User from "../models/user";
import { deleteMedia } from "../utils/deleteMedia";
import fs from "fs";
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import { sendErrorResponse } from "../utils/utilityFunction";

// Ensure the upload directory exists
const uploadDir = path.resolve(__dirname, "../upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // create the directory if it doesn't exist
}

//setup multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); //path where the uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, randomUUID() + "-" + Date.now() + path.extname(file.originalname));
  },
});

// setup file filter to allow only specific file types(optional)
const fileFilter = (
  req: Request,
  file: File,
  cb: (error: Error | null, acceptFile: boolean) => void
) => {
  const allowTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowTypes.includes(file.type)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};
export const upload = multer({
  storage: storage,
  limits: { files: 1024 * 1024 * 5 }, // limit files size to 5MB
  //   fileFilter: fileFilter,
});

//function upload file
export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { sender, text = "", conversationId } = req.body; // sender and text passed from the client

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    if (!sender || !conversationId) {
      res
        .status(400)
        .json({ message: "sender and conversationId are required " });
      return;
    }

    // Save file details to the Upload collection
    const newUpload = new Upload({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      // path: req.file.path,
      path: `/upload/${req.file.filename}`,
      fullPath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    const savedUpload = await newUpload.save();

    // Create a message and attach the uploaded file's ID to the media field
    const newMessage = new Message({
      sender,
      text,
      conversationId,
      media: savedUpload._id, // Attach the file's ID
    });
    // 461d8501-acdb-41df-b305-9ef99eb4ab14-1729019493317.jpg
    const savedMessage = await newMessage.save();
    const populatedMessage = await savedMessage.populate([
      {
        path: "sender",
        select: "username _id profile_picture ",
        populate: {
          path: "profile_picture",
          model: "Upload",
          select: "path _id mimetype originalName fileName fullPath",
        },
      },
      {
        path: "media",
        select: "path _id mimetype originalName fileName fullPath",
      },
    ]);
    res
      .status(201)
      //   .json({ message: "Upload file successfully", file: req.file });
      .json({ success: true, message: populatedMessage });
  } catch (error) {
    console.error("Error uploading Data", error);
    sendErrorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Server error, please try again"
    );
    return;
  }
};

export const uploadProfilePic = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body; // sender and text passed from the client

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    console.log("req.file", req.file);

    if (!userId) {
      res.status(400).json({ message: "userId is required " });
      return;
    }
    console.log("req.file", req.file);

    // find user
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      res.status(404).json({ message: "user not found " });
      return;
    }
    if (foundUser.profile_picture) {
      const dbMedia = await Upload.findById(foundUser.profile_picture);

      //delete media
      if (dbMedia) {
        const mediaDeleted = deleteMedia(dbMedia);
        if (mediaDeleted) {
          console.log("media deleted successfully");
        }
      }
      const removeMedia = await Upload.findByIdAndDelete(
        foundUser.profile_picture
      );
    }
    // Save file details to the Upload collection
    const newUpload = new Upload({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      // path: req.file.path,
      path: `/upload/${req.file.filename}`,
      fullPath: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    const savedUpload = await newUpload.save();

    foundUser.profile_picture = savedUpload._id;
    const updateUser = await foundUser.save();
    const populatedUser = await updateUser.populate(
      "profile_picture",
      "path _id mimetype originalName fileName fullPath"
    );

    if (populatedUser) {
      const profilePicture = populatedUser.profile_picture;
      res.status(201).json(profilePicture);
      return;
    } else {
      res
        .status(500)
        //   .json({ message: "Upload file successfully", file: req.file });
        .json({ success: false, message: "Internal lServer error" });
      return;
    }
  } catch (error) {
    console.error("Error uploading Data", error);
    sendErrorResponse(
      res,
      500,
      error instanceof Error ? error.message : "Server error, please try again"
    );
    return;
  }
};
