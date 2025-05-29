import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export default function NewTransactionCard() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        padding: 4,
        width: "690px",
        height: "425px",
        backgroundColor: "#cbcbcb",
        position: "relative",
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="#dee9ea" mb={2}>
        Nova transação
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <Select
          value={type}
          displayEmpty
          onChange={(e) => setType(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: "8px",
            alignSelf: "flex-start",
            width: "355px",
            height: "48px",
            "& .MuiSelect-icon": { color: theme.palette.primary.main },
            "& .MuiSelect-select": {
              padding: "12px 8px",
              height: 24,
            },
          }}
        >
          <MenuItem value="" disabled>
            Selecione o tipo de transação
          </MenuItem>
          <MenuItem value="1">Depósito</MenuItem>
          <MenuItem value="2">Transferência</MenuItem>
        </Select>

        <Box>
          <Typography variant="body1" fontWeight={600} color="#dee9ea" mb={1}>
            Valor
          </Typography>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="00,00"
            sx={{
              zIndex: 1,
              backgroundColor: "#fff",
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "8px",
              width: "250px",
              "& .MuiInputBase-input": {
                padding: "12px 8px",
                height: "24px",
                textAlign: "center",
              },
            }}
            InputProps={{
              style: {
                height: 48,
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={() => alert(`Tipo: ${type}, Valor: ${value}`)}
          sx={{
            zIndex: 1,
            backgroundColor: theme.palette.primary.main,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            width: "250px",
            "&:hover": {
              backgroundColor: "#006B80",
            },
          }}
        >
          Concluir transação
        </Button>
      </Box>
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
