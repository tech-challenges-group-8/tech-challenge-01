"use client";

import {
  Box,
  Paper,
} from "@mui/material";

export default function CardBackground({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        padding: 4,
        width: "90%",
        height: "425px",
        backgroundColor: "#cbcbcb",
        position: "relative",
      }}
    >
      {children}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "grid",
          gridTemplateColumns: "repeat(4, 45px)",
          gridTemplateRows: "repeat(4, 45px)",
        }}
      >
        {[
          [1, 0, 2, 0],
          [0, 1, 3, 0],
          [0, 0, 1, 0],
          [0, 0, 3, 1],
        ]
          .flat()
          .map((color, i) => (
            <Box
              key={i}
              sx={{
                width: 45,
                height: 45,
                backgroundColor:
                  color === 1
                    ? "#dee9ea"
                    : color === 2
                    ? "#d9d9d9"
                    : color === 3
                    ? "#d9d9d980"
                    : "#cbcbcb",
                borderRadius: i === 3 ? 2 : "inherit",
              }}
            />
          ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          display: "grid",
          gridTemplateColumns: "repeat(4, 45px)",
          gridTemplateRows: "repeat(4, 45px)",
        }}
      >
        {[
          [1, 2, 0, 0],
          [0, 1, 0, 0],
          [0, 2, 1, 0],
          [0, 3, 0, 1],
        ]
          .flat()
          .map((color, i) => (
            <Box
              key={i}
              sx={{
                width: 45,
                height: 45,
                backgroundColor:
                  color === 1
                    ? "#dee9ea"
                    : color === 2
                    ? "#d9d9d9"
                    : color === 3
                    ? "#d9d9d980"
                    : "#cbcbcb",
                borderRadius: i === 12 ? 2 : "inherit",
              }}
            />
          ))}
      </Box>
    </Paper>
  );
}
