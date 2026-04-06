import { createContext, useReducer, useEffect } from "react";
import { appReducer, initialState } from "./appReducer";
import { mockTransactions } from "../data/mockTransactions";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial data
  useEffect(() => {
    const savedData = localStorage.getItem("financeState");

    if (savedData) {
      dispatch({ type: "SET_TRANSACTIONS", payload: JSON.parse(savedData).transactions });
      dispatch({ type: "SET_ROLE", payload: JSON.parse(savedData).role });
    } else {
      dispatch({ type: "SET_TRANSACTIONS", payload: mockTransactions });
    }
  }, []);

  // Persist data
  useEffect(() => {
    localStorage.setItem(
      "financeState",
      JSON.stringify({
        transactions: state.transactions,
        role: state.role,
      })
    );
  }, [state.transactions, state.role]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}