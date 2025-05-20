"use client";

import React from "react";
import { Box, List, ListItemButton, ListItemText, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, text }) => {
  const theme = useTheme();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItemButton component={Link} to={to}>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          sx: {
            color: isActive
              ? theme.palette.primary.contrastText
              : theme.palette.text.primary,
            fontWeight: isActive ? "bold" : "normal",
          },
        }}
      />
    </ListItemButton>
  );
};

const Sidebar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 200,
        bgcolor: theme.palette.background.paper,
        boxShadow: 2,
      }}
    >
      <List sx={{ width: "100%" }}>
        <SidebarItem to="/dashboard" text="Início" />
        <SidebarItem to="/transactions" text="Transferências" />
        <SidebarItem to="/investiments" text="Investimentos" />
        <SidebarItem to="/services" text="Outros serviços" />
      </List>
    </Box>
  );
};

export default Sidebar;
