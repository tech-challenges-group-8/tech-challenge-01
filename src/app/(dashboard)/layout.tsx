"use client";

import BalanceCard from "@/app/components/BalanceCard";
import CardBackground from "@/app/components/CardBackground";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 68px)",
          backgroundColor: "#e4ede3",
          padding: "16px",
          gap: "16px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Sidebar />
        <BalanceCard />
        <CardBackground>{children}</CardBackground>
      </Box>
    </Box>
  );
}
