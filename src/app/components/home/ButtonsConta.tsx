"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SnackbarProvider, useSnackbar, VariantType } from "notistack";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: "180px",
  height: "48px",
  borderRadius: "8px",
  backgroundColor: "#47A138",
  color: "#FFFFFF",
  fontWeight: 600,
  fontSize: "16px",
  border: "2px solid #47A138",
  textTransform: "none",
  transition: "all 0.3s ease",
  padding: "0px",

  "&:hover": {
    backgroundColor: "transparent",
    color: "#47A138",
  },
  [theme.breakpoints.down("lg")]: {
    width: "144px",
    height: "48px",
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    backgroundColor: "#000000",
    border: "2px solid #000000",
  },
}));

function ButtonsConta() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erro, setErro] = useState("");

  const zerarCampos = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setAceitouTermos(false);
    setErro("");
  };

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant });
  };

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    const response = await fetch("/api/autenticar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      handleClickVariant("success", "Login realizado com sucesso!")();
      setIsRegisterOpen(false);
      router.push("/dashboard");
    } else {
      setErro("Falha no login: " + data.message);
      return;
    }
    setErro(""); // Limpa o erro se passou na validação
  };

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validação simples
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!aceitouTermos) {
      setErro("Você precisa aceitar os termos.");
      return;
    }

    const response = await fetch("/api/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
      }),
    });
    const data = await response.json();

    if (response.ok && data.success) {
      setIsRegisterOpen(false);
      handleClickVariant("success", "Cadastro realizado com sucesso!")();
    } else {
      setErro("Falha no cadastro: " + data.message);
      return;
    }

    setErro(""); // Limpa o erro se passou na validação
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <Box sx={{ display: { xs: "none", sm: "none", lg: "block" } }}>
        <CustomButton
          variant="contained"
          onClick={() => {
            setIsRegisterOpen(true);
            zerarCampos();
          }}
        >
          Abrir minha conta
        </CustomButton>
      </Box>

      <Box sx={{ display: { xs: "block", sm: "block", lg: "none" } }}>
        <CustomButton
          variant="contained"
          onClick={() => {
            setIsRegisterOpen(true);
            zerarCampos();
          }}
        >
          Abrir conta
        </CustomButton>
      </Box>

      <CustomButton
        variant="contained"
        sx={{
          width: "180px",
          height: "48px",
          borderRadius: "8px",
          backgroundColor: "#47A138",
          color: "#FFFFFF",
          fontWeight: "600",
          fontSize: "16px",
          border: "2px solid #47A138",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "transparent",
            color: "#47A138",
            padding: "0px",
          },
        }}
        onClick={() => {
          setIsLoginOpen(true);
          zerarCampos();
        }}
      >
        Ja tenho conta
      </CustomButton>
      <BootstrapDialog
        onClose={() => setIsLoginOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={isLoginOpen}
      >
        <IconButton
          aria-label="close"
          onClick={() => setIsLoginOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              maxWidth: "333px",
              position: "relative",
              aspectRatio: "333 / 260",
            }}
          >
            <Image
              src="/home/ilustracao-login.svg"
              alt="banner"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
          <Typography
            component="p"
            sx={{
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: "bold",
              color: "#000000",
              width: "100%",
            }}
          >
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            {erro && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {erro}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={() => setIsRegisterOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={isRegisterOpen}
      >
        <IconButton
          aria-label="close"
          onClick={() => setIsRegisterOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              maxWidth: "355px",
              position: "relative",
              aspectRatio: "355 / 260",
            }}
          >
            <Image
              src="/home/ilustracao-cadastro.svg"
              alt="banner"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
          <Typography
            component="p"
            sx={{
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: "bold",
              color: "#000000",
              width: "100%",
            }}
          >
            Preencha os campos abaixo para criar sua conta corrente!
          </Typography>
          <Box component="form" onSubmit={handleCadastrar} noValidate>
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={aceitouTermos}
                  onChange={(e) => setAceitouTermos(e.target.checked)}
                />
              }
              label="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco."
              sx={{ mt: 1 }}
            />

            {erro && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {erro}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Criar Conta
            </Button>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ButtonsConta />
    </SnackbarProvider>
  );
}
