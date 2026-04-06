import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function InsightsCards() {
  const { state } = useContext(AppContext);

  const expenses = state.transactions.filter((t) => t.type === "expense");
  const income = state.transactions.filter((t) => t.type === "income");

  //  Highest spending category
  const categoryMap = {};

  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const sortedCategories = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  );

  const highestCategory = sortedCategories[0];

  //  Savings rate
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const savingsRate =
    totalIncome === 0 ? 0 : ((totalIncome - totalExpense) / totalIncome) * 100;

  //  Top 3 categories
  const top3 = sortedCategories.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Highest category */}
      <Card
        title="Highest Spending Category"
        value={
          highestCategory
            ? `${highestCategory[0]} (₹ ${highestCategory[1]})`
            : "No data"
        }
      />

      {/* Savings rate */}
      <Card
        title="Savings Rate"
        value={`${savingsRate.toFixed(1)} %`}
      />

      {/* Top 3 */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-3">Top 3 Categories</h3>

        {top3.map(([cat, amount]) => (
          <div key={cat} className="flex justify-between mb-2">
            <span>{cat}</span>
            <span>₹ {amount}</span>
          </div>
        ))}
      </div>

      {/* Dynamic observation */}
      <div className="bg-primary-50 dark:bg-primary-900 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Insight</h3>
        <p>
          You are spending most on{" "}
          <strong>{highestCategory?.[0] || "N/A"}</strong>.
        </p>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
}