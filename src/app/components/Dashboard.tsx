"use client";

import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { Transaction } from "../contexts/UserContext";
import { useTransactions } from "../hooks/useTransactions";

interface DashboardProps {
  initialTransactions?: Transaction[];
}

interface ChartData {
  date: string;
  deposits: number;
  transactions: number;
}

export default function Dashboard({ initialTransactions }: DashboardProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const hookTransactions = useTransactions().transactions;
  const transactions = initialTransactions || hookTransactions;

  const uniqueTransactions = Array.from(
    new Map(transactions.map((t) => [t.id, t])).values()
  );

  // Group transactions by date and separate deposits from withdrawals
  const chartData = uniqueTransactions
    .reduce<Record<string, { deposits: number; transactions: number }>>((acc, transaction) => {
      const dateKey = new Date(transaction.date).toLocaleDateString();
      
      if (!acc[dateKey]) {
        acc[dateKey] = { deposits: 0, transactions: 0 };
      }

      if (transaction.type !== "TRANSFER") {
        acc[dateKey].deposits += transaction.value;
      } else {
        acc[dateKey].transactions += Math.abs(transaction.value);
      }

      return acc;
    }, {});

  const formattedData: ChartData[] = Object.entries(chartData)
    .map(([date, amounts]) => ({
      date,
      deposits: amounts.deposits,
      transactions: amounts.transactions,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Box
      sx={{
        width: { xs: `calc(100% - ${theme.spacing(2)})`, lg: "800px" },
        height: {
          xs: "400px",
          md: `calc(100vh - 64px - ${theme.spacing(2)} * 2)`,
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
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={theme.spacing(2)}
          color={theme.palette.primary.main}
        >
          {t("dashboard.title", "Transaction Trends")}
        </Typography>

        <Box sx={{ flexGrow: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value: number) => `R$ ${value.toFixed(0)}`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `R$ ${value.toFixed(2)}`,
                  name === "deposits" ? "Deposits" : "Transactions"
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="deposits"
                stroke={theme.palette.success.main}
                strokeWidth={2}
                name="Deposits"
                dot={{ fill: theme.palette.success.main, strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke={theme.palette.error.main}
                strokeWidth={2}
                name="Transactions"
                dot={{ fill: theme.palette.error.main, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}
