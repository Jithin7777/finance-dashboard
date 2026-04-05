// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { Home, CreditCard, BarChart2, X } from "lucide-react";

const Sidebar = ({ onClose }) => {
  const menuItems = [
    { name: "Dashboard", to: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Transactions", to: "/transactions", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Insights", to: "/insights", icon: <BarChart2 className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white h-full flex flex-col border-r border-gray-200 shadow-lg">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Finance App</h1>

        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="xl:hidden p-1 rounded hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="flex flex-col flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors text-gray-700 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold shadow-inner"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {item.icon}
            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 text-gray-500 text-sm">
        © {new Date().getFullYear()} My Finance
      </div>
    </aside>
  );
};

export default Sidebar;