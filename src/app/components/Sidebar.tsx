"use client";

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

interface SidebarItemProps {
  href: string;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, text }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <ListItemButton
      LinkComponent={Link}
      href={href}
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
        <SidebarItem href="/" text={t("sidebar.home")} />
        <SidebarItem href="/transactions" text={t("sidebar.transactions")} />
        <SidebarItem href="/investiments" text={t("sidebar.investments")} />
        <SidebarItem href="/services" text={t("sidebar.services")} />
      </List>
    </Box>
  );
};

export default Sidebar;
