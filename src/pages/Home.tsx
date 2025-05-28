import {
  DesktopWindows as DesktopIcon,
  PhoneAndroid as MobileIcon,
  SyncAlt as SyncIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import DeviceSelector from "../components/DeviceSelector";

const Home: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: theme.shadows[10],
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.primary.contrastText,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 1,
              }}
            >
              KYC Onboarding Portal
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Seamless cross-device communication for customer verification
            </Typography>
          </Box>

          <Box sx={{ p: isSmallScreen ? 3 : 6 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.secondary.main,
                      width: 80,
                      height: 80,
                      mb: 3,
                    }}
                  >
                    <SyncIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Cross-Device Sync
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ mb: 3 }}
                  >
                    Start on one device, continue on another. Our real-time sync
                    ensures seamless KYC verification across all your devices.
                  </Typography>
                  <Divider sx={{ width: "80%", my: 2 }} />
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    "Reduced drop-offs by 63% with our cross-device flow"
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 3,
                    p: 4,
                    boxShadow: theme.shadows[2],
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      textAlign: "center",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DesktopIcon sx={{ mr: 1 }} />
                    <MobileIcon sx={{ mr: 1 }} />
                    Select Device Mode
                  </Typography>
                  <DeviceSelector />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
