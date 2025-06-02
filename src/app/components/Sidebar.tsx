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
        borderLeft: {
          xs: "none",
          md: isActive ? `3px solid ${theme.palette.action.active}` : "none",
        },
        borderBottom: {
          xs: isActive ? `3px solid ${theme.palette.action.active}` : "none",
          md: "none",
        },
        minWidth: { xs: "auto", md: 180 },
        justifyContent: { xs: "center", md: "flex-start" },
        paddingX: { xs: 1, md: 2 },
        paddingY: { xs: 0.5, md: 1 },
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
            textAlign: { xs: "center", md: "left" },
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
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        width: { xs: `calc(100% - ${theme.spacing(4)})`, md: 180 },
        height: { xs: "auto", md: "100%" },
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        boxShadow: 2,
        justifyContent: { xs: "space-around", md: "flex-start" },
        alignItems: "center",
        padding: { xs: theme.spacing(1), md: 0 },
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          width: "100%",
          justifyContent: { xs: "space-around", md: "flex-start" },
          alignItems: "center",
        }}
      >
        <SidebarItem href="/dashboard" text={t("sidebar.home")} />
        <SidebarItem href="/transactions" text={t("sidebar.transactions")} />
        <SidebarItem href="/investiments" text={t("sidebar.investments")} />
        <SidebarItem href="/services" text={t("sidebar.services")} />
      </List>
    </Box>
  );
};

export default Sidebar;
