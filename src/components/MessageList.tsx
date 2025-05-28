import { Box, List, ListItem, Typography, useTheme } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { MessageListProps } from "../types/messages";

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentDevice,
}) => {
  const theme = useTheme();

  return (
    <List
      sx={{
        width: "100%",
        p: 0,
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {messages.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            No messages yet. Start the conversation!
          </Typography>
        </Box>
      ) : (
        messages.map((msg) => (
          <ListItem
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent:
                msg.deviceType === currentDevice ? "flex-end" : "flex-start",
              px: 1,
              py: 0.5,
            }}
          >
            <Box
              sx={{
                maxWidth: "80%",
                p: 1.5,
                borderRadius: 4,
                backgroundColor:
                  msg.deviceType === currentDevice
                    ? theme.palette.primary.main
                    : theme.palette.grey[300],
                color:
                  msg.deviceType === currentDevice
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                boxShadow: theme.shadows[1],
                wordBreak: "break-word",
              }}
            >
              <Typography variant="body1">{msg.message}</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.7,
                    fontSize: "0.7rem",
                    color:
                      msg.deviceType === currentDevice
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.5)",
                  }}
                >
                  {format(new Date(msg.timestamp), "h:mm a")}
                  {msg.deviceType !== currentDevice && ` • ${msg.deviceType}`}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default MessageList;
