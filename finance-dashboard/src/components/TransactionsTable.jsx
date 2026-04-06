import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function TransactionsTable() {
  const { state, dispatch } = useContext(AppContext);
  const [sortBy, setSortBy] = useState("date");

  let data = [...state.transactions];

  // 🔍 FILTERING
  if (state.filters.search) {
    data = data.filter((t) =>
      t.description.toLowerCase().includes(state.filters.search.toLowerCase())
    );
  }

  if (state.filters.type !== "all") {
    data = data.filter((t) => t.type === state.filters.type);
  }

  if (state.filters.category !== "all") {
    data = data.filter((t) => t.category === state.filters.category);
  }

  // 🔃 SORTING
  data.sort((a, b) => {
    if (sortBy === "amount") return b.amount - a.amount;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th onClick={() => setSortBy("date")} className="cursor-pointer">Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th onClick={() => setSortBy("amount")} className="cursor-pointer">Amount</th>
            {state.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="border-b">
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              <td className={t.type === "income" ? "text-green-500" : "text-red-500"}>
                ₹ {t.amount}
              </td>

              {/* 🔐 ADMIN ONLY */}
              {state.role === "admin" && (
                <td>
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_TRANSACTION", payload: t.id })
                    }
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <p className="text-center py-4 text-gray-500">
          No transactions found
        </p>
      )}
    </div>
  );
}