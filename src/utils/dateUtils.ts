import { format } from "date-fns";

export const formatMessageTimestamp = (timestamp: number): string => {
  if (
    timestamp === null ||
    timestamp === undefined ||
    isNaN(timestamp) ||
    typeof timestamp !== "number"
  ) {
    return "";
  }

  try {
    return format(new Date(timestamp), "MMM dd, h:mm a");
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "";
  }
};

export default { formatMessageTimestamp };
