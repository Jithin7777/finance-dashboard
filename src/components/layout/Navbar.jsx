import { useFinanceStore } from "../../store/financeStore";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import DarkModeToggle from "../ui/DarkModeToggle";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Navbar({ toggleMobile }) {
  const role = useFinanceStore((state) => state.role);
  const setRole = useFinanceStore((state) => state.setRole);

  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/transactions": "Transactions",
    "/insights": "Insights",
  };

  const title = pageTitles[location.pathname] || "Finance Dashboard";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between border-b dark:border-gray-700">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobile}
          className="xl:hidden"
        >
          <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
        </Button>

        {/* Title */}
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Select value={role} onValueChange={(value) => setRole(value)}>
          <SelectTrigger className="w-[110px] sm:w-[130px] bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <SelectValue placeholder="Role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="viewer">Viewer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>

        <DarkModeToggle />
      </div>
    </nav>
  );
}
