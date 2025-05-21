import React from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, useTheme } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  const user = {
    name: "John Doe",
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", height: "68px" }}>
        <Box sx={{ visibility: { xs: "hidden", md: "visible" } }}>
          {/* Placeholder for balance on mobile */}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ marginRight: 3, color: theme.palette.secondary.contrastText }}
          >
            {user.name}
          </Typography>
          <Avatar
            sx={{
              border: `2px solid ${theme.palette.primary.contrastText}`,
              color: theme.palette.primary.contrastText,
              backgroundColor: "transparent",
              width: "40px",
              height: "40px",
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;