// src/components/layout/Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  LineChart,
  Landmark,
  X,
  User,
} from "lucide-react";

import DarkModeToggle from "../ui/DarkModeToggle";
import { useFinanceStore } from "../../store/financeStore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Sidebar = ({ onClose }) => {
  const role = useFinanceStore((state) => state.role);
  const setRole = useFinanceStore((state) => state.setRole);

  const menuItems = [
    {
      name: "Dashboard",
      to: "/",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Transactions",
      to: "/transactions",
      icon: <Receipt className="w-5 h-5" />,
    },
    {
      name: "Insights",
      to: "/insights",
      icon: <LineChart className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 h-full flex flex-col border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300">
      <div className="p-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Landmark className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            FinTrack
          </h1>
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="xl:hidden p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-200 hover:scale-105"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>
      {/* Menu */}
      <nav className="flex flex-col flex-1 p-2 mt-2 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center gap-3 p-3 rounded-lg
        transition-all duration-300 ease-in-out
        ${
          isActive
            ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`
            }
          >
            <div className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
              {item.icon}
            </div>

            <span className="truncate text-sm font-medium transition-all duration-300 group-hover:translate-x-1">
              {item.name}
            </span>

            <div className="ml-auto w-1 h-5 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-40 transition duration-300" />
          </NavLink>
        ))}
      </nav>{" "}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-300 text-sm font-medium">
          <User className="w-4 h-4" />
          <span>User Role</span>
        </div>

        <Select value={role} onValueChange={(value) => setRole(value)}>
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition duration-200 focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="viewer">Viewer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
        {/* Dark Mode Toggle */}
        <div className="flex justify-center transition duration-200 hover:scale-105">
          <DarkModeToggle />
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} FinTrack
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
