"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  TextField,
  Button,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { useState } from "react";

import type { Transaction } from "../contexts/UserContext";
import { useUser } from "../contexts/UserContext";

export default function Statement() {
  const theme = useTheme();
  const { transactions, deleteTransaction, editTransaction } = useUser();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const handleOpenModal = (id: string) => setOpenModalId(id);
  const handleCloseModal = () => setOpenModalId(null);

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    handleCloseModal();
  };

  const startEditing = (tx: Transaction) => {
    setEditingId(tx.id);
    setEditedValue(tx.value.toString());
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedValue(event.target.value);
  };

  const saveEdit = (tx: Transaction) => {
    const parsed = parseFloat(editedValue);
    if (isNaN(parsed)) {
      alert("Valor inválido");
      return;
    }

    editTransaction({ ...tx, value: parsed });
    setEditingId(null);
    setEditedValue("");
  };

  // Agrupamento e deduplicação
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

                  {editingId === tx.id ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <TextField
                        size="small"
                        value={editedValue}
                        onChange={handleValueChange}
                        inputProps={{ style: { width: "80px" } }}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => saveEdit(tx)}
                      >
                        OK
                      </Button>
                    </Box>
                  ) : (
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
                  )}

                  <Typography variant="caption" color="#8B8B8B">
                    {new Date(tx.date).toLocaleDateString("pt-BR")}
                  </Typography>
                </Box>

                <Box>
                  <IconButton onClick={() => startEditing(tx)}>
                    <EditIcon sx={{ fontSize: 18, color: "#004D61" }} />
                  </IconButton>
                  <IconButton onClick={() => handleOpenModal(tx.id)}>
                    <DeleteIcon sx={{ fontSize: 18, color: "#004D61" }} />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ mt: 1 }} />

              <Modal
                open={openModalId === tx.id}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 300 }}
              >
                <Fade in={openModalId === tx.id}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: 2,
                      width: 300,
                    }}
                  >
                    <Typography variant="body1" mb={2}>
                      Tem certeza que deseja excluir esta transação?
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => handleDelete(tx.id)}
                    >
                      Deletar transação
                    </Button>
                  </Box>
                </Fade>
              </Modal>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
