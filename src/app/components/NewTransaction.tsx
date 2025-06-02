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
import { useTranslation } from "react-i18next";

const TRANSACTION_TYPES = (t: any) => [
  { value: "DEPOSIT", label: t("newTransaction.typeDeposit") },
  { value: "TRANSFER", label: t("newTransaction.typeTransfer") },
];

export default function NewTransaction() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const { t } = useTranslation();

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

  const handleSubmit = async () => {
    if (!type) {
      setError(t("newTransaction.errorSelectType"));
      return;
    }
    if (!value || parseFloat(value) <= 0) {
      setError(t("newTransaction.errorInvalidValue"));
      return;
    }
    setError("");

    const selectedType = TRANSACTION_TYPES(t).find((t) => t.value === type);

    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: selectedType?.label,
        value: value
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      //fazer algo quando dar certo
    } else {
      setError("Falha no cadastro: " + data.message);
      return;
    }
  };

  return (
    <>
      <Typography variant="h4" fontWeight="bold" color="#dee9ea" mb={2}>
        {t("newTransaction.title")}
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
            {t("newTransaction.typeLabel")}
          </InputLabel>
          <Select
            labelId="transaction-type-label"
            id="transaction-type-select"
            value={type}
            label={t("newTransaction.typeLabel")}
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
            {TRANSACTION_TYPES(t).map((transactionType) => (
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
            {t("newTransaction.valueLabel")}
          </Typography>
          <TextField
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            placeholder={t("newTransaction.valuePlaceholder")}
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
          {t("newTransaction.completeButton")}
        </Button>
      </Box>
    </>
  );
}
