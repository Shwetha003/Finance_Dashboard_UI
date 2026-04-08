import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SummaryCards() {
  const { state } = useContext(AppContext);

  const income = state.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = state.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Balance" value={balance} />
      <Card title="Income" value={income} />
      <Card title="Expenses" value={expenses} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold mt-2">₹ {value}</p>
    </div>
  );
}