"use client";

import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import { Suspense } from "react";

import BalanceCard from "@/app/components/BalanceCard";
import CardBackground from "@/app/components/CardBackground";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../commons/i18n";
import Statement from "../components/Statement";
import { UserProvider } from "../contexts/UserContext";
import theme from "../styles/theme";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProvider>
          <Box>
            <Header />
            <Box
              sx={{
                display: "flex",
                backgroundColor: theme.palette.background.default,
                padding: "16px",
                gap: "16px",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: {
                  xs: "column", // Layout em coluna para telas pequenas
                  md: "row", // Layout em linha para telas médias e maiores
                },
              }}
            >
              <Sidebar />
              <Box
                sx={{
                  display: "grid",
                  gridGap: "16px",
                  width: { xs: `calc(100% - ${theme.spacing(2)})`, md: "100%" },
                }}
              >
                <BalanceCard />
                <CardBackground>{children}</CardBackground>
              </Box>
              <Statement />
            </Box>
          </Box>
        </UserProvider>
      </Suspense>
    </ThemeProvider>
  );
}
