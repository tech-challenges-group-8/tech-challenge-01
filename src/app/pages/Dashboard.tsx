import BalanceCard from "@/app/components/BalanceCard";
import NewTransactionCard from "@/app/components/NewTransactionCard";
import { Box, Container } from "@mui/material";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridGap: "16px",
      }}
    >
      <BalanceCard />
      <NewTransactionCard />
    </Box>
  );
};

export default Dashboard;
