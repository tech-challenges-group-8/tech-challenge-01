"use client";

import { AppBar, Toolbar, Typography, Box, Avatar, useTheme, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { useUser } from "../contexts/UserContext";

const Header = () => {
  const theme = useTheme();
  const { user, setUser } = useUser();
  const router = useRouter();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        setUser(null); // Clear user context
        router.push("/"); // Redirect to home page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
            {user?.name}
          </Typography>
          <IconButton
            onClick={handleMenu}
            aria-controls={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="inherit"
            sx={{ padding: 0 }}
          >
            <Avatar
              sx={{
                border: `2px solid ${theme.palette.primary.contrastText}`,
                color: theme.palette.primary.contrastText,
                backgroundColor: "transparent",
                width: "40px",
                height: "40px",
              }}
            >
              {user?.name?.charAt(0) || "U"}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>{t("header.logout")}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
