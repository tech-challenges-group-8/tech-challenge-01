"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Import Transaction type
// Keep useUser for other user data if needed
import { useTransactions } from "../hooks/useTransactions"; // Import useTransactions hook

import LoadingButton from "./LoadingButton";
import NumericInputField from "./NumericInputField";

const TRANSACTION_TYPES = (t: any) => [
  { value: "DEPOSIT", label: t("newTransaction.typeDeposit") },
  { value: "TRANSFER", label: t("newTransaction.typeTransfer") },
];

export default function NewTransaction() {
  const { addTransaction } = useTransactions(); // Get addTransaction from useTransactions hook
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (isSubmitting) return;

    if (!type) {
      setError(t("newTransaction.errorSelectType"));
      return;
    }

    const parsedValue = parseFloat(value);
    if (!value || isNaN(parsedValue) || parsedValue <= 0) {
      setError(t("newTransaction.errorInvalidValue"));
      return;
    }

    setIsSubmitting(true);
    setError("");

    const newTransaction = {
      id: crypto.randomUUID(), // ou deixe o backend gerar
      type: type as "DEPOSIT" | "TRANSFER",
      value: parsedValue,
      date: new Date().toISOString(),
    };

    try {
      await addTransaction(newTransaction); // Call addTransaction from hook
      setType("");
      setValue("");
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
      setError("Erro ao adicionar transação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Typography variant="h4" fontWeight="bold" color="#dee9ea" mb={2} sx={{ color: { xs: theme.palette.primary.main, sm: '#dee9ea' } }}>
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
              width: { xs: "100%", sm: "400px" },
              "& .MuiSelect-icon": { color: theme.palette.primary.main },
            }}
            disabled={isSubmitting}
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
          <Typography variant="body1" fontWeight={600} mb={1} sx={{ color: { xs: theme.palette.primary.main, sm: '#dee9ea' } }}>
            {t("newTransaction.valueLabel")}
          </Typography>
          <NumericInputField
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            placeholder={t("newTransaction.valuePlaceholder")}
            sx={{
              zIndex: 1,
              width: { xs: "100%", sm: "400px" },
              "& .MuiInputBase-input": {
                textAlign: "center",
              },
            }}
            error={!!error}
            disabled={isSubmitting}
          />
        </Box>

        {error && (
          <Typography color="error" variant="caption" mt={-1} mb={1}>
            {error}
          </Typography>
        )}

        <LoadingButton
          onClick={handleSubmit}
          isSubmitting={isSubmitting}
          loadingText={t("newTransaction.loadingButton")}
          sx={{ width: { xs: "100%", sm: "250px" } }}
        >
          {t("newTransaction.completeButton")}
        </LoadingButton>
      </Box>
    </>
  );
}
