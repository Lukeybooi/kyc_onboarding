import {
  ArrowBack as ArrowBackIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import { HOME_ROUTE } from "../route";
import { sendMessage, subscribeToMessages } from "../services/firebase";
import { Message } from "../types/messages";

const MobileApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeToMessages((newMessages: Message[]) => {
      setMessages(newMessages);
    });
    return () => unsubscribe();
  }, []);

  const handleSend = (deviceType: "desktop" | "mobile", message: string) => {
    sendMessage(deviceType, message);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(HOME_ROUTE)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: theme.palette.secondary.main,
              width: 32,
              height: 32,
              mr: 2,
            }}
          >
            K
          </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KYC Onboarding
          </Typography>
          <IconButton color="inherit">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: isSmallScreen ? 1 : 2,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9))",
          backgroundAttachment: "fixed",
        }}
      >
        <MessageList messages={messages} currentDevice="mobile" />
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <MessageInput onSend={handleSend} deviceType="mobile" />
      </Box>
    </Box>
  );
};

export default MobileApp;
