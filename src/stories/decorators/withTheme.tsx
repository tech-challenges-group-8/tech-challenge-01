import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../app/styles/theme";

export const withTheme = (Story: React.FC) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
);
