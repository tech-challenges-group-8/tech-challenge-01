"use client";

import {
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Transaction } from "../contexts/UserContext";
import { useUser } from "../contexts/UserContext";

export default function Statement() {
  const theme = useTheme();
  const { transactions, deleteTransaction, editTransaction } = useUser();

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      deleteTransaction(id);
    }
  };

  const handleEdit = (tx: Transaction) => {
    const newValue = prompt("Digite o novo valor:", tx.value.toString());
    if (!newValue) return;
    const parsedValue = parseFloat(newValue);
    if (isNaN(parsedValue)) return alert("Valor inválido");

    editTransaction({
      ...tx,
      value: parsedValue,
    });
  };

  // Remove transações duplicadas por ID
  const uniqueTransactions = Array.from(
    new Map(transactions.map((t) => [t.id, t])).values()
  );

  const groupedByMonth = uniqueTransactions.reduce<
    Record<string, Transaction[]>
  >((acc, transaction) => {
    const monthLabel = new Date(transaction.date).toLocaleString("default", {
      month: "long",
    });
    if (!acc[monthLabel]) acc[monthLabel] = [];
    acc[monthLabel].push(transaction);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        width: "282px",
        height: "900px",
        bgcolor: "#F5F5F5",
        borderRadius: "8px",
        p: 2,
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2} color={theme.palette.primary.main}>
        Extrato
      </Typography>

      {Object.entries(groupedByMonth).map(([month, monthTransactions]) => (
        <Box key={month} mb={2}>
          <Typography
            fontWeight="bold"
            textTransform="capitalize"
            color={theme.palette.primary.main}
            mb={1}
          >
            {month}
          </Typography>

          {monthTransactions.map((tx) => (
            <Box key={tx.id} mb={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="body2"
                    color={theme.palette.primary.main}
                  >
                    {tx.type === "TRANSFER" ? "Transferência" : "Depósito"}
                  </Typography>
                  <Typography
                    fontWeight={600}
                    color={
                      tx.type === "TRANSFER"
                        ? theme.palette.error.main
                        : theme.palette.success.main
                    }
                  >
                    {tx.type === "TRANSFER"
                      ? `-R$ ${Number(tx.value).toFixed(2)}`
                      : `R$ ${Number(tx.value).toFixed(2)}`}
                  </Typography>
                  <Typography variant="caption" color="#8B8B8B">
                    {new Date(tx.date).toLocaleDateString("pt-BR")}
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handleEdit(tx)}>
                    <EditIcon sx={{ fontSize: 18, color: "#004D61" }} />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(tx.id)}>
                    <DeleteIcon sx={{ fontSize: 18, color: "#004D61" }} />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
