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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import type { Transaction } from "../contexts/UserContext";
import { useTransactions } from "../hooks/useTransactions";

import NumericInputField from "./NumericInputField";

interface TransactionItemProps {
  tx: Transaction;
}

export default function TransactionItem({ tx }: TransactionItemProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { editTransaction, deleteTransaction } = useTransactions();

  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(tx.value.toString());
  const [editError, setEditError] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteConfirm = async () => {
    await deleteTransaction(tx.id);
    handleCloseDeleteModal();
  };

  const handleStartEditing = () => {
    setEditing(true);
    setEditedValue(tx.value.toString());
    setEditError("");
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedValue(event.target.value);
    if (editError) setEditError("");
  };

  const handleSaveEdit = async () => {
    const parsed = parseFloat(editedValue);
    if (isNaN(parsed) || parsed <= 0) {
      setEditError(t("statement.invalidValue"));
      return;
    }

    await editTransaction({ ...tx, value: parsed });
    setEditing(false);
    setEditedValue(parsed.toString());
    setEditError("");
  };

  return (
    <Box mb={theme.spacing(2)}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color={theme.palette.primary.main}>
            {tx.type === "TRANSFER"
              ? t("statement.transfer")
              : t("statement.deposit")}
          </Typography>

          {editing ? (
            <Box display="flex" alignItems="center" gap={theme.spacing(1)}>
              <NumericInputField
                value={editedValue}
                onChange={handleValueChange}
                sx={{
                  zIndex: 1,
                  width: { xs: "100%", sm: "150px" },
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
                error={!!editError}
                helperText={editError}
              />
              <Button variant="outlined" size="small" onClick={handleSaveEdit}>
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

          <Typography variant="caption" color={theme.palette.text.secondary}>
            {new Date(tx.date).toLocaleDateString("pt-BR")}
          </Typography>
        </Box>

        <Box>
          <IconButton onClick={handleStartEditing}>
            <EditIcon
              sx={{
                fontSize: 18,
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
          <IconButton onClick={handleOpenDeleteModal}>
            <DeleteIcon
              sx={{
                fontSize: 18,
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ mt: theme.spacing(1) }} />

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={openDeleteModal}>
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
              onClick={handleDeleteConfirm}
            >
              {t("statement.deleteTransaction")}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
