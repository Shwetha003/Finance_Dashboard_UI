import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function BalanceChart() {
  const { state } = useContext(AppContext);

  // group by month
  const monthlyData = {};

  state.transactions.forEach((t) => {
    const month = t.date.slice(0, 7);

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += t.type === "income" ? t.amount : -t.amount;
  });

  const data = Object.keys(monthlyData).map((month) => ({
    month,
    balance: monthlyData[month],
  }));

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">Balance Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#6366f1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}