import { useFinanceStore } from "../../store/financeStore";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar({ toggleMobile }) {
  const role = useFinanceStore((state) => state.role);
  const setRole = useFinanceStore((state) => state.setRole);

  const location = useLocation();

  // Map path to dynamic title
  const pageTitles = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/insights": "Insights",
  };

  const title = pageTitles[location.pathname] || "Finance Dashboard";

  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Hamburger only on mobile */}
        <button
          onClick={toggleMobile}
          className="xl:hidden p-2 rounded hover:bg-gray-200"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-lg sm:text-xl font-bold">
          {title}
        </h1>
      </div>

      {/* Role Switch */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border rounded px-2 py-1 text-sm sm:text-base"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>

    </nav>
  );
}