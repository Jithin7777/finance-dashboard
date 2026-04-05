  import { create } from "zustand";
  import { persist } from "zustand/middleware";
  import mockData from "../data/transactions.json";

  export const useFinanceStore = create(
    persist(
      (set) => ({
        transactions: mockData,
        role: "viewer",

        //  Search & Filter States
        search: "",
        filterType: "",
        filterCategory: "",

        setSearch: (value) => set({ search: value }),
        setFilterType: (type) => set({ filterType: type }),
        setFilterCategory: (category) => set({ filterCategory: category }),

        // CRUD
        addTransaction: (transaction) =>
          set((state) => ({
            transactions: [...state.transactions, transaction].sort(
              (a, b) => new Date(b.date) - new Date(a.date),
            ),
          })),
      editTransaction: (id, updated) =>
    set((state) => ({
      transactions: state.transactions
        .map((t) => (t.id === id ? { ...t, ...updated } : t))
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    })),

        deleteTransaction: (id) =>
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          })),

        setRole: (role) => set({ role }),

        groupBy: "",

        setGroupBy: (value) =>
          set({
            groupBy: value,
          }),
      }),
      {
        name: "finance-storage",
      },
    ),
  );
