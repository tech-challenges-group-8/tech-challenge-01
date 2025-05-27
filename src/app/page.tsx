"use client";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import theme from "./styles/theme";
import Transactions from "./pages/Transactions";
import Investiments from "./pages/Investiments";
import Services from "./pages/Services";
import "./commons/i18n";
import HeaderHome from "./components/home/HeaderHome";
import FooterHome from "./components/home/FooterHome";
import BodyHome from "./components/home/BodyHome";

export default function Home() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderHome />
      <BodyHome />
      <FooterHome />
    </ThemeProvider>
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    //   <BrowserRouter>
    //     <HeaderHome />
    //     <FooterHome />
    //     <Box sx={{ display: "flex", height: "calc(100vh - 68px)" }}>
    //       <Sidebar />
    //       <Box sx={{ flex: 1, overflow: "auto", padding: 2 }}>
    //         <Routes>
    //           <Route path="/" element={<Dashboard />} />
    //           <Route path="/transactions" element={<Transactions />} />
    //           <Route path="/investiments" element={<Investiments />} />
    //           <Route path="/services" element={<Services />} />
    //         </Routes>
    //       </Box>
    //     </Box>
    //   </BrowserRouter>
    // </ThemeProvider>
  );
}
