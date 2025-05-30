import { CssBaseline, ThemeProvider } from "@mui/material";

import Dashboard from "@/app/dashboard/page";
import { cookies } from "next/headers";
import "./commons/i18n";
import BodyHome from "./components/home/BodyHome";
import FooterHome from "./components/home/FooterHome";
import HeaderHome from "./components/home/HeaderHome";
import theme from "./styles/theme";

export default async function Home() {
  const cookieStore = await cookies();
  const isAuth =  cookieStore.get('auth')?.value === "true";
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuth ? (
        <>
          <HeaderHome />
          <BodyHome />
          <FooterHome />
        </>
      ) : (
        <Dashboard />
      )}
    </ThemeProvider>
  );
}
