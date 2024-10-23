export const convertDate = (date: Date) => {
  const dateStr = date;
  const newDate = new Date(dateStr);
  const hours = newDate.getUTCHours();
  const minutes = newDate.getUTCMinutes();
  const am_pm = hours > 12 ? "pm" : "am";

  // convert 0 hours to 12
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const time = `${formattedHours}:${formattedMinutes} ${am_pm}`;

  return time;
};
