import mongoose, { Document, Schema } from "mongoose";

export interface IUpload extends Document {
  originalName: string;
  fileName: string;
  path: string;
  fullPath: string;
  mimetype: string;
  size: number;
  createdAt: Date;
}

const uploadSchema = new Schema<IUpload>(
  {
    originalName: { type: String, required: true },
    path: { type: String, required: true },
    fullPath: { type: String, required: true },
    fileName: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

const Upload = mongoose.model<IUpload>("Upload", uploadSchema);

export default Upload;
