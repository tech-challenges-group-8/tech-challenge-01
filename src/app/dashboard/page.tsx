import BalanceCard from "@/app/components/BalanceCard";
import NewTransactionCard from "@/app/components/NewTransaction";
import { Box } from "@mui/material";

export default function Dashboard() {
  return (
    <Box
      sx={{
        display: "grid",
        gridGap: "16px",
      }}
    >
      <NewTransactionCard />
    </Box>
  );
}
