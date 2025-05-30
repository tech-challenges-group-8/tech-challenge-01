"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import BodyHome from "./components/home/BodyHome";
import FooterHome from "./components/home/FooterHome";
import HeaderHome from "./components/home/HeaderHome";
import theme from "./styles/theme";

export default async function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderHome />
      <BodyHome />
      <FooterHome />
    </ThemeProvider>
  );
}
