"use client";

import { Box } from "@mui/material";
import { SnackbarProvider, useSnackbar, VariantType } from "notistack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import CustomButton from "./CustomButton";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

function ButtonsAccount() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const clearFields = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setAcceptedTerms(false);
    setError("");
  };

  const handleClickVariant = (variant: VariantType, message: string) => () => {
    enqueueSnackbar(message, { variant });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError(t("account.fillAllFields"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        handleClickVariant("success", t("account.loginSuccess"))();
        setIsLoginOpen(false);
        router.push("/dashboard");
      } else {
        setError(t("account.loginFailed") + data.message);
      }
    } catch (err) {
      setError(t("account.loginError"));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!userName || !email || !password) {
      setError(t("account.fillAllFields"));
      setIsLoading(false);
      return;
    }

    if (!acceptedTerms) {
      setError(t("account.acceptTerms"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setIsRegisterOpen(false);
        handleClickVariant("success", t("account.registerSuccess"))();
      } else {
        setError(t("account.registerFailed") + data.message);
      }
    } catch (err) {
      setError(t("account.registerError"));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <Box sx={{ display: { xs: "none", sm: "none", lg: "block" } }}>
        <CustomButton
          variant="contained"
          onClick={() => {
            setIsRegisterOpen(true);
            clearFields();
          }}
          disabled={isLoading}
        >
          {t("account.openMyAccount")}
        </CustomButton>
      </Box>

      <Box sx={{ display: { xs: "block", sm: "block", lg: "none" } }}>
        <CustomButton
          variant="contained"
          onClick={() => {
            setIsRegisterOpen(true);
            clearFields();
          }}
          disabled={isLoading}
        >
          {t("account.openAccount")}
        </CustomButton>
      </Box>

      <CustomButton
        variant="contained"
        onClick={() => {
          setIsLoginOpen(true);
          clearFields();
        }}
        disabled={isLoading}
      >
        {t("account.alreadyHaveAccount")}
      </CustomButton>

      <LoginDialog
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        isLoading={isLoading}
        error={error}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        t={t}
      />

      <RegisterDialog
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        isLoading={isLoading}
        error={error}
        userName={userName}
        email={email}
        password={password}
        acceptedTerms={acceptedTerms}
        setUserName={setUserName}
        setEmail={setEmail}
        setPassword={setPassword}
        setAcceptedTerms={setAcceptedTerms}
        handleRegister={handleRegister}
        t={t}
      />
    </Box>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ButtonsAccount />
    </SnackbarProvider>
  );
}
