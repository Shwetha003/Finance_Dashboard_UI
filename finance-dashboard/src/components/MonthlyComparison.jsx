import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function MonthlyComparison() {
  const { state } = useContext(AppContext);

  const monthly = {};

  state.transactions.forEach((t) => {
    const month = t.date.slice(0, 7);

    if (!monthly[month]) {
      monthly[month] = { income: 0, expense: 0 };
    }

    monthly[month][t.type] += t.amount;
  });

  const data = Object.keys(monthly).map((month) => ({
    month,
    income: monthly[month].income,
    expense: monthly[month].expense,
  }));

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">Monthly Comparison</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#10b981" />
          <Bar dataKey="expense" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}