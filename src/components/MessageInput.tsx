import {
  AttachFile,
  Description,
  Image,
  Mood,
  PictureAsPdf,
  Send,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { Fragment, useRef, useState } from "react";
import { uploadFile } from "../services/firebase";
import { MessageInputProps } from "../types/messages";
import { AlertDialog } from "./AlertDialog";

const MessageInput: React.FC<MessageInputProps> = ({ onSend, deviceType }) => {
  const [message, setMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(deviceType, message);
      setMessage("");
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setEmojiOpen(false);
  };

  const handleFileClick = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setDialogOpen(true);
    // Feature temporarily disabled because of Firebase implementation.
    // setAnchorEl(_event.currentTarget);
  };

  const handleFileClose = () => {
    setAnchorEl(null);
  };

  const handleFileUpload = (type: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type;
      fileInputRef.current.click();
    }
    handleFileClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploading(true);

      try {
        const downloadURL = await uploadFile(file);
        onSend(deviceType, `[File: ${file.name}](${downloadURL})`);
      } catch (error) {
        onSend(deviceType, "[Failed to upload file]");
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleDialogVisibility = () => {
    setDialogOpen(false);
  };

  return (
    <Fragment>
      <AlertDialog
        title="File Attachment in Chat"
        body="Unfortunately the feature is temporarily disabled."
        open={dialogOpen}
        handleClose={handleDialogVisibility}
      />
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <IconButton
            color="primary"
            onClick={handleFileClick}
            aria-label="attach file"
            disabled={uploading}
          >
            {uploading ? <CircularProgress size={24} /> : <AttachFile />}
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => setEmojiOpen(!emojiOpen)}
            aria-label="emoji picker"
            disabled={uploading}
          >
            <Mood />
          </IconButton>

          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={uploading}
            sx={{
              mx: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    color="primary"
                    disabled={!message.trim() || uploading}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                      },
                      "&:disabled": {
                        backgroundColor: theme.palette.grey[300],
                      },
                    }}
                  >
                    <Send fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </form>

      {emojiOpen && (
        <ClickAwayListener onClickAway={() => setEmojiOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              bottom: 70,
              right: 16,
              zIndex: theme.zIndex.modal,
            }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={400}
              previewConfig={{ showPreview: false }}
            />
          </Box>
        </ClickAwayListener>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleFileClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Upload File
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => handleFileUpload("image/*")}
              color="primary"
              sx={{ flexDirection: "column" }}
            >
              <Image />
              <Typography variant="caption">Image</Typography>
            </IconButton>
            <IconButton
              onClick={() => handleFileUpload(".pdf")}
              color="primary"
              sx={{ flexDirection: "column" }}
            >
              <PictureAsPdf />
              <Typography variant="caption">PDF</Typography>
            </IconButton>
            <IconButton
              onClick={() => handleFileUpload(".doc,.docx")}
              color="primary"
              sx={{ flexDirection: "column" }}
            >
              <Description />
              <Typography variant="caption">Document</Typography>
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </Fragment>
  );
};

export default MessageInput;
