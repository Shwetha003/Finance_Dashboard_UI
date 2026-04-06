import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { categories } from "../data/mockTransactions";

export default function Filters() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="flex flex-wrap gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        value={state.filters.search}
        onChange={(e) =>
          dispatch({
            type: "SET_FILTERS",
            payload: { search: e.target.value },
          })
        }
        className="px-3 py-2 border rounded-lg"
      />

      {/* TYPE FILTER */}
      <select
        value={state.filters.type}
        onChange={(e) =>
          dispatch({
            type: "SET_FILTERS",
            payload: { type: e.target.value },
          })
        }
        className="px-3 py-2 border rounded-lg"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* CATEGORY */}
      <select
        value={state.filters.category}
        onChange={(e) =>
          dispatch({
            type: "SET_FILTERS",
            payload: { category: e.target.value },
          })
        }
        className="px-3 py-2 border rounded-lg"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}