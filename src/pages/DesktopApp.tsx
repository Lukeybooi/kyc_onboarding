import {
  ArrowBack as ArrowBackIcon,
  ChevronLeft as ChevronLeftIcon,
  DesktopWindows,
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
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

const DesktopApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
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

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 240 : 72,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 240 : 72,
            boxSizing: "border-box",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: "hidden",
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          },
        }}
        open={open}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "64px !important",
            px: open ? 2 : 1.5,
          }}
        >
          {open && <Typography variant="h6">KYC Portal</Typography>}
          <IconButton onClick={handleDrawerToggle} color="inherit">
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button sx={{ px: open ? 3 : 2.5 }}>
            <ListItemIcon
              sx={{ color: "inherit", minWidth: "auto", mr: open ? 2 : 0 }}
            >
              <DesktopWindows />
            </ListItemIcon>
            {open && <ListItemText primary={"Chat"} />}
          </ListItem>
        </List>
      </Drawer>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
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
                  width: 40,
                  height: 40,
                  mr: 2,
                }}
              >
                K
              </Avatar>
              <Box>
                <Typography variant="subtitle1">KYC Onboarding</Typography>
                <Typography variant="caption" color="textSecondary">
                  Real-time communication channel
                </Typography>
              </Box>
            </Box>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: isLargeScreen ? 4 : 2,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95))",
            backgroundSize: "cover",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              maxWidth: 800,
              mx: "auto",
              p: 3,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Desktop Communication Channel
            </Typography>
            <MessageList messages={messages} currentDevice="desktop" />
          </Paper>
        </Box>

        <Box
          sx={{
            p: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <MessageInput onSend={handleSend} deviceType="desktop" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DesktopApp;
