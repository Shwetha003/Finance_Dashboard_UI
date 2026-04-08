import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const COLORS = ["#6366f1", "#10b981", "#ef4444", "#f59e0b", "#3b82f6"];

export default function CategoryChart() {
  const { state } = useContext(AppContext);

  if (!state.transactions.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No data available
      </div>
    );
  }

  const categoryMap = {};

  state.transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }
      categoryMap[t.category] += t.amount;
    });

  const data = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat],
  }));

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">Spending Breakdown</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}