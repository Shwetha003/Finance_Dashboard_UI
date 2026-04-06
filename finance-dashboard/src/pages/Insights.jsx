import InsightsCards from "../components/InsightsCards";
import MonthlyComparison from "../components/MonthlyComparison";

export default function Insights() {
  return (
    <div className="space-y-6">
      <InsightsCards />
      <MonthlyComparison />
    </div>
  );
}