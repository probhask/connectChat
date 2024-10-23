import { fileFormatIcons } from "@constants/AcceptMediaFormats";

export const getDocPreview = (ext: string): string | null => {
  return ext && fileFormatIcons[ext] ? fileFormatIcons[ext] : null;
};
