export const formattedText = (text: string): string => {
  const formattedMessage = text.replace(/\n/g, "<br>");
  return formattedMessage;
};
