import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <div className="w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Finance</h2>

      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/transactions" className={linkClass}>
          Transactions
        </NavLink>

        <NavLink to="/insights" className={linkClass}>
          Insights
        </NavLink>
      </nav>
    </div>
  );
}