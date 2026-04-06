import SummaryCards from "../components/SummaryCards";
import BalanceChart from "../components/BalanceChart";
import CategoryChart from "../components/CategoryChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <SummaryCards />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BalanceChart />
        <CategoryChart />
      </div>
    </div>
  );
}