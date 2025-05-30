"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  capitalize,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const BalanceCard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const locale = navigator.language;
  const now = capitalize(
    new Date().toLocaleDateString(locale, {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );

  return (
    <Box
      sx={{
        borderRadius: 2,
        padding: 4,
        width: "690px",
        height: "400px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.contrastText,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "220px",
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Olá, John Doe! :)
        </Typography>
        <Typography variant="body2" mt={3}>
          {now}
        </Typography>
      </Box>

      <Box
        sx={{
          textAlign: "left",
          alignSelf: "center",
          width: "179px",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight="bold">
            {t("balanceCard.balance")}
          </Typography>
          <IconButton sx={{ padding: 0 }}>
            <VisibilityIcon
              sx={{ fontSize: 18, color: theme.palette.primary.contrastText }}
            />
          </IconButton>
        </Box>

        <Divider
          sx={{
            borderColor: theme.palette.primary.contrastText,
            borderBottomWidth: "2px",
            my: 0.5,
          }}
        />
        <Typography variant="body2" mt={1}>
          {t("balanceCard.account")}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          R$ 2.500,00
        </Typography>
      </Box>
    </Box>
  );
};

export default BalanceCard;
