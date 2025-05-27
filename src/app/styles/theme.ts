import { createTheme } from "@mui/material/styles";

import { COLORS, TYPOGRAPHY, SPACING, SHAPE } from "./tokens";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,     // Mobile
      sm: 720,   // Tablet pequeno
      md: 960,   // Tablet grande / Desktop pequeno
      lg: 1280,  // Desktop médio
      xl: 1920,  // Desktop grande
    },
  },
});

export default theme;
