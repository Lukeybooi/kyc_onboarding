export interface Message {
  id: string;
  deviceType: "desktop" | "mobile";
  message: string;
  timestamp: number;
}

export type MessageListProps = {
  messages: Message[];
  currentDevice: "desktop" | "mobile";
};

export type MessageInputProps = {
  onSend: (deviceType: "desktop" | "mobile", message: string) => void;
  deviceType: "desktop" | "mobile";
};

export type AlertDialogProps = {
  title: string;
  body: string;
  open: boolean;
  handleClose: () => void;
};
