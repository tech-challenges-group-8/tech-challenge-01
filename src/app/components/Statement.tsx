"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  useTheme,
  Button,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import NumericInputField from "./NumericInputField";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import type { Transaction } from "../contexts/UserContext";
import { useUser } from "../contexts/UserContext";

export default function Statement() {
  const { t } = useTranslation();
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
      alert(t("statement.invalidValue"));
      return;
    }

    editTransaction({ ...tx, value: parsed });
    setEditingId(null);
    setEditedValue("");
  };

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
        width: { xs: `calc(100% - ${theme.spacing(4)})`, lg: "400px" },
        height: {
          xs: "400px",
          md: "100%",
        },
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        paddingX: { xs: 1, md: 2 },
        paddingY: { xs: 0.5, md: 1 },
      }}
    >
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          color={theme.palette.primary.main}
        >
          {t("statement.title")}
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
                      {tx.type === "TRANSFER"
                        ? t("statement.transfer")
                        : t("statement.deposit")}
                    </Typography>

                    {editingId === tx.id ? (
                      <Box display="flex" alignItems="center" gap={1}>
                        <NumericInputField
                          value={editedValue}
                          onChange={handleValueChange}
                          sx={{
                            zIndex: 1,
                            width: { xs: "100%", sm: "250px" },
                            "& .MuiInputBase-input": {
                              textAlign: "center",
                            },
                          }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => saveEdit(tx)}
                        >
                          {t("statement.ok")}
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

                    <Typography
                      variant="caption"
                      color={theme.palette.text.secondary}
                    >
                      {new Date(tx.date).toLocaleDateString("pt-BR")}
                    </Typography>
                  </Box>

                  <Box>
                    <IconButton onClick={() => startEditing(tx)}>
                      <EditIcon
                        sx={{ fontSize: 18, color: theme.palette.primary.main }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleOpenModal(tx.id)}>
                      <DeleteIcon
                        sx={{ fontSize: 18, color: theme.palette.primary.main }}
                      />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ mt: theme.spacing(1) }} />

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
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: 24,
                        p: theme.spacing(4),
                        borderRadius: theme.shape.borderRadius,
                        width: 300,
                      }}
                    >
                      <Typography variant="body1" mb={theme.spacing(2)}>
                        {t("statement.confirmDelete")}
                      </Typography>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => handleDelete(tx.id)}
                      >
                        {t("statement.deleteTransaction")}
                      </Button>
                    </Box>
                  </Fade>
                </Modal>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
