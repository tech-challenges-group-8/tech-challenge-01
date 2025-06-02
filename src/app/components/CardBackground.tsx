"use client";

import { Box, Paper } from "@mui/material";

import BoxMatrixBackground from "./BoxMatrixBackground";

export default function CardBackground({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        width: "100%",
        minHeight: "400px",
        display: "flex",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          backgroundColor: "#cbcbcb",
          position: "relative",
        }}
      >
        <BoxMatrixBackground
          matrix={[
            [1, 0, 2, 0],
            [0, 1, 3, 0],
            [0, 0, 1, 0],
            [0, 0, 3, 1],
          ]}
          colors={["#cbcbcb", "#dee9ea", "#d9d9d9", "#d9d9d980"]}
          position="top-right"
          borderRadiusIndex={3}
        />
        <BoxMatrixBackground
          matrix={[
            [1, 2, 0, 0],
            [0, 1, 0, 0],
            [0, 2, 1, 0],
            [0, 3, 0, 1],
          ]}
          colors={["#cbcbcb", "#dee9ea", "#d9d9d9", "#d9d9d980"]}
          position="bottom-left"
          borderRadiusIndex={12}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 10,
          }}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
