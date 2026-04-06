import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TransactionsTable from "../components/TransactionsTable";
import Filters from "../components/Filters";

export default function Transactions() {
  const { state } = useContext(AppContext);

  return (
    <div className="space-y-6">
      
      {/* ADMIN ONLY BUTTON */}
      {state.role === "admin" && (
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            + Add Transaction
          </button>
        </div>
      )}

      <Filters />

      <TransactionsTable />
      
    </div>
  );
}