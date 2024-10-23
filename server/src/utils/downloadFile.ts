import { Request, Response } from "express";

import path from "path";

export const downLoadFile = async (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;
    console.log("req", req.query);

    if (!filename) {
      res.status(400).json({ message: "provide file name" });
      return;
    }
    const filePath = path.join(__dirname, "../upload", filename);
    console.log(filePath);
    if (!filePath) {
      res.status(404).json({ message: "unable to find file path" });
      return;
    }

    res.status(200).download(filePath);
  } catch (error) {
    console.error("Error in downloading file:", error);
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Server error, please try again",
    });
    return;
  }
};
