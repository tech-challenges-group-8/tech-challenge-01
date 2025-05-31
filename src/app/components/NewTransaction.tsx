"use client";

import {
  Box,
  Button,
  FormControl, 
  InputLabel, 
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";


const TRANSACTION_TYPES = [
  { value: "DEPOSIT", label: "Depósito" },
  { value: "TRANSFER", label: "Transferência" },
  
];

export default function NewTransaction() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState(""); 
  const theme = useTheme();

  
  const commonInputStyles = {
    backgroundColor: "#fff",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "8px",
    "& .MuiInputBase-input": {
      padding: "12px 8px", 
      height: "24px", 
    },
    "& .MuiOutlinedInput-notchedOutline": {
      
      border: "none",
    },
  };

  
  const handleSubmit = () => {
    
    if (!type) {
      setError("Por favor, selecione o tipo de transação.");
      return;
    }
    if (!value || parseFloat(value) <= 0) {
      setError("Por favor, insira um valor válido maior que zero.");
      return;
    }
    setError(""); 

    
    const selectedType = TRANSACTION_TYPES.find((t) => t.value === type);
    alert(`Tipo: ${selectedType?.label}, Valor: ${value}`);

    
    
    
  };

  return (
    <>
      <Typography variant="h4" fontWeight="bold" color="#dee9ea" mb={2}>
        Nova transação
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <FormControl
          sx={{
            width: { xs: "100%", sm: "355px" }, 
            alignSelf: "flex-start",
          }}
        >
          <InputLabel
            id="transaction-type-label"
            sx={{
              color: type ? theme.palette.primary.main : undefined, 
              "&.Mui-focused": { color: theme.palette.primary.main }, 
            }}
          >
            Tipo de transação
          </InputLabel>
          <Select
            labelId="transaction-type-label"
            id="transaction-type-select"
            value={type}
            label="Tipo de transação" 
            onChange={(e) => {
              setType(e.target.value);
              if (error) setError(""); 
            }}
            sx={{
              ...commonInputStyles,
              height: "48px",
              "& .MuiSelect-icon": { color: theme.palette.primary.main },
            }}
          >
            {TRANSACTION_TYPES.map((transactionType) => (
              <MenuItem
                key={transactionType.value}
                value={transactionType.value}
              >
                {transactionType.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography variant="body1" fontWeight={600} color="#dee9ea" mb={1}>
            Valor
          </Typography>
          <TextField
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(""); 
            }}
            placeholder="0,00" 
            type="number" 
            InputProps={{
              inputProps: { min: 0.01, step: 0.01 }, 
              style: {
                height: 48, 
              },
            }}
            sx={{
              ...commonInputStyles,
              zIndex: 1, 
              width: { xs: "100%", sm: "250px" }, 
              "& .MuiInputBase-input": {
                
                ...commonInputStyles["& .MuiInputBase-input"], 
                textAlign: "center",
              },
            }}
          />
        </Box>

        {error && (
          <Typography color="error" variant="caption" mt={-1} mb={1}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleSubmit} 
          sx={{
            zIndex: 1, 
            backgroundColor: theme.palette.primary.main,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            width: { xs: "100%", sm: "250px" }, 
            height: "48px",
            "&:hover": {
              backgroundColor: "#006B80", 
            },
          }}
        >
          Concluir transação
        </Button>
      </Box>
    </>
  );
}
