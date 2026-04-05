import React from "react";
import { useFinanceStore } from "../../store/financeStore";
import { Search } from "lucide-react";

const SearchBar = () => {
  const search = useFinanceStore((state) => state.search);
  const setSearch = useFinanceStore((state) => state.setSearch);

  return (
    <div className="relative w-full sm:w-72">

      {/* Search Icon */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search by category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          pl-10
          pr-3
          py-2
          border
          rounded-lg
          shadow-sm
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition
        "
      />

    </div>
  );
};

export default SearchBar;