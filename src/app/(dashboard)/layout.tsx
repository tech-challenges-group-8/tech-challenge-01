"use client";

import Box from "@mui/material/Box";

import BalanceCard from "@/app/components/BalanceCard";
import CardBackground from "@/app/components/CardBackground";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import "../commons/i18n";
import { ThemeProvider } from "@mui/material";

import theme from "../styles/theme";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header />
        <Box
          sx={{
            display: "flex",
            height: "calc(100vh - 68px)",
            backgroundColor: theme.palette.background.default,
            padding: "16px",
            gap: "16px",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Sidebar />
          <Box
            sx={{
              display: "grid",
              gridGap: "16px",
            }}
          >
            <BalanceCard />
            <CardBackground>{children}</CardBackground>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
