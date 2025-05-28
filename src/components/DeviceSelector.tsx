import { DesktopWindows, PhoneAndroid } from "@mui/icons-material";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DESKTOP_ROUTE, MOBILE_ROUTE } from "../route";

const DeviceSelector: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate(DESKTOP_ROUTE)}
        startIcon={<DesktopWindows />}
        sx={{
          py: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
          boxShadow: theme.shadows[4],
        }}
      >
        <Box sx={{ textAlign: "left", flexGrow: 1 }}>
          <Typography variant="button" display="block" sx={{ fontWeight: 600 }}>
            Desktop Client
          </Typography>
          <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
            Continue on your computer
          </Typography>
        </Box>
      </Button>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate(MOBILE_ROUTE)}
        startIcon={<PhoneAndroid />}
        sx={{
          py: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.secondary.main,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
          boxShadow: theme.shadows[4],
        }}
      >
        <Box sx={{ textAlign: "left", flexGrow: 1 }}>
          <Typography variant="button" display="block" sx={{ fontWeight: 600 }}>
            Mobile Client
          </Typography>
          <Typography variant="caption" display="block" sx={{ opacity: 0.8 }}>
            Continue on your phone
          </Typography>
        </Box>
      </Button>
    </Stack>
  );
};

export default DeviceSelector;
