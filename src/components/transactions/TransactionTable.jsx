// src/components/transactions/TransactionTable.jsx
import React, { useState } from "react";
import { useFinanceStore } from "../../store/financeStore";
import { filterTransactions } from "../../utils/filters";
import {
  groupByCategory,
  groupByType,
  groupByMonth,
} from "../../utils/grouping";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2 } from "lucide-react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { ArrowUp, ArrowDown } from "lucide-react";
const TransactionTable = ({ onEdit }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const transactions = useFinanceStore((state) => state.transactions);
  const role = useFinanceStore((state) => state.role);
  const deleteTransaction = useFinanceStore((state) => state.deleteTransaction);

  const search = useFinanceStore((state) => state.search);
  const filterType = useFinanceStore((state) => state.filterType);
  const filterCategory = useFinanceStore((state) => state.filterCategory);
  const groupBy = useFinanceStore((state) => state.groupBy);

  //  Filter
  const filteredTransactions = filterTransactions(
    transactions,
    search,
    filterType,
    filterCategory,
  );

  let groupedTransactions = {};
  if (groupBy === "category")
    groupedTransactions = groupByCategory(filteredTransactions);
  else if (groupBy === "type")
    groupedTransactions = groupByType(filteredTransactions);
  else if (groupBy === "month")
    groupedTransactions = groupByMonth(filteredTransactions);
  else groupedTransactions = { All: filteredTransactions };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700 border dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Transactions
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and track your financial activities
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredTransactions.length} records
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-700">
            <TableRow>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200">
                Date
              </TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200">
                Category
              </TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200">
                Type
              </TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200">
                Description
              </TableHead>
              <TableHead className="font-semibold text-gray-600 dark:text-gray-200">
                Amount
              </TableHead>
              {role === "admin" && (
                <TableHead className="font-semibold text-gray-600 dark:text-gray-200">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={role === "admin" ? 6 : 5}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  <div>
                    <p>No transactions found</p>
                    <p className="text-sm">
                      Try changing filters or add a new transaction
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              Object.keys(groupedTransactions).map((group) => (
                <React.Fragment key={group}>
                  {/* Group Title */}
                  <TableRow>
                    <TableCell
                      colSpan={role === "admin" ? 6 : 5}
                      className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold py-3 pl-4 border-l-4 border-blue-500"
                    >
                      {group}
                    </TableCell>
                  </TableRow>

                  {groupedTransactions[group].map((t) => (
                    <TableRow
                      key={t.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        {new Date(t.date).toLocaleDateString("en-IN")}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        {t.category}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            t.type === "income"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          }
                        >
                          {t.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-gray-100">
                        {t.description}
                      </TableCell>
                      <TableCell
                        className={`font-bold flex items-center gap-1 ${
                          t.type === "income"
                            ? "text-green-600 dark:text-green-300"
                            : "text-red-600 dark:text-red-300"
                        }`}
                      >
                        {t.type === "income" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        ₹{t.amount}
                      </TableCell>
                      {role === "admin" && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onEdit(t)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>

                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                setTransactionToDelete(t);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden px-3 sm:px-4 py-4 space-y-6">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p className="text-base font-medium">No transactions found</p>
            <p className="text-sm">Add your first transaction</p>
          </div>
        ) : (
          Object.keys(groupedTransactions).map((group) => (
            <div key={group} className="space-y-3">
              {/* Group Title */}
              <h3 className="font-semibold text-indigo-600 dark:text-indigo-300 text-sm sm:text-base">
                {group}
              </h3>

              {groupedTransactions[group].map((t) => (
                <Card
                  key={t.id}
                  className="shadow-sm border dark:border-gray-700 hover:shadow-md transition bg-white dark:bg-gray-800"
                >
                  <CardContent className="p-4 space-y-3 text-gray-900 dark:text-gray-100">
                    {/* Category & Type */}
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="font-medium text-sm sm:text-base">
                        {t.category}
                      </span>

                      <Badge
                        className={
                          t.type === "income"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {t.type}
                      </Badge>
                    </div>

                    <Separator />

                    {/* Date */}
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {new Date(t.date).toLocaleDateString("en-IN")}
                    </div>

                    {/* Description */}
                    <div className="text-sm text-gray-600 dark:text-gray-300 break-words">
                      {t.description}
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        Amount
                      </span>

                      <span
                        className={`font-bold ${
                          t.type === "income"
                            ? "text-green-600 dark:text-green-300 flex items-center gap-1"
                            : "text-red-600 dark:text-red-300 flex items-center gap-1"
                        }`}
                      >
                        {t.type === "income" ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        ₹{t.amount}
                      </span>
                    </div>

                    {/* Admin Buttons */}
                    {role === "admin" && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 sm:flex-none"
                          onClick={() => onEdit(t)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1 sm:flex-none"
                          onClick={() => {
                            setTransactionToDelete(t);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ))
        )}
      </div>
      {/* Delete Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onConfirm={() => {
          if (transactionToDelete) {
            deleteTransaction(transactionToDelete.id);
            setTransactionToDelete(null);
          }
        }}
      />
    </div>
  );
};

export default TransactionTable;
