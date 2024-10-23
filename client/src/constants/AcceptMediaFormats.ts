export const fileFormat: { [key: string]: string[] } = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".svg"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".xlsx", ".ppt", ".pptx"],
  compressed: [".zip", ".rar"],
};

export const acceptMediaFormat: string = [
  ...fileFormat.images,
  ...fileFormat.documents,
  ...fileFormat.compressed,
].join(",");

export const fileFormatIcons: { [key: string]: string } = {
  pdf: "📄 PDF",
  doc: "📄 Word Document",
  docx: "📄 Word Document",
  txt: "📄 Text File",
  xlsx: "📄 Excel File",
  ppt: "📄 Powerpoint",
  pptx: "📄 Powerpoint",
  zip: "📄 ZIP Archive",
  rar: "📄 RAR Archive",
};
