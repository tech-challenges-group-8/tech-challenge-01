import React from "react";
import { Box, List, ListItemButton, ListItemText, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SidebarItemProps {
  to: string;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, text }) => {
  const theme = useTheme();
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItemButton
      component={Link}
      to={to}
      sx={{
        borderLeft: isActive
          ? `3px solid ${theme.palette.action.active}`
          : "none",
      }}
    >
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          sx: {
            color: isActive
              ? theme.palette.action.active
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
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: 180,
        height: "100%",
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        boxShadow: 2,
      }}
    >
      <List sx={{ width: "100%" }}>
        <SidebarItem to="/" text={t("sidebar.home")} />
        <SidebarItem to="/transactions" text={t("sidebar.transactions")} />
        <SidebarItem to="/investiments" text={t("sidebar.investments")} />
        <SidebarItem to="/services" text={t("sidebar.services")} />
      </List>
    </Box>
  );
};

export default Sidebar;
