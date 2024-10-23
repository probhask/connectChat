import mongoose from "mongoose";

export function validateMongooseId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
