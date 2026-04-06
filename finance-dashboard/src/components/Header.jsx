import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Header({ setOpen }) {
  const { state, dispatch } = useContext(AppContext);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden"
        >
          ☰
        </button>

        <h1 className="font-semibold text-lg">Finance Dashboard</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        
        {/* 🌙 DARK MODE BUTTON (PUT IT HERE) */}
        <button
          onClick={toggleDark}
          className="px-3 py-1 border rounded-lg"
        >
          🌙
        </button>

        {/* ROLE SWITCHER */}
        <select
          value={state.role}
          onChange={(e) =>
            dispatch({ type: "SET_ROLE", payload: e.target.value })
          }
          className="px-3 py-1 border rounded-lg dark:bg-gray-900"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

      </div>
    </header>
  );
}