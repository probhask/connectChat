import Upload, { IUpload } from "../models/upload";

import fs from "fs";
import path from "path";

export const deleteMedia = (dbMedia: IUpload) => {
  if (dbMedia) {
    const mediaPath = path.join(__dirname, "..", "upload", dbMedia?.fileName);

    try {
      //check if the file exist then delete it
      fs.unlink(mediaPath, (err: any) => {
        if (err && err.code !== "ENOENT") {
          console.error(`Error deleting media file : ${mediaPath}`, err);
        } else {
          console.log(`Deleted media file :\n`, mediaPath);
        }
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  } else {
    return false;
  }
};
