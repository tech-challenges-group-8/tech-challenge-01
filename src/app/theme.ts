import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#004D61",
      dark: "#000",
      contrastText: "#FF5031",
    },
    secondary: {
      light: "#7edce2",
      main: "#38B2AC",
      dark: "#2c7a7b",
      contrastText: "#000000",
    },
    background: {
      default: "#F7FAFC",
      paper: "#ffffff",
    },
    text: {
      primary: "#2D3748",
      secondary: "#4A5568",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Define your font family
    h1: {
      fontSize: "25px", // Heading 1
      fontWeight: 700,
    },
    h2: {
      fontSize: "20px", // Heading 2
      fontWeight: 600,
    },
    body1: {
      fontSize: "16px", // Body text
      fontWeight: 400,
    },
    body2: {
      fontSize: "13px", // Smaller body text
      fontWeight: 400,
    },
  },
});

export default theme;
