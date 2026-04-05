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

import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

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

  // 🔍 Filter
  const filteredTransactions = filterTransactions(
    transactions,
    search,
    filterType,
    filterCategory,
  );

  // 📊 Group
  let groupedTransactions = {};

  if (groupBy === "category") {
    groupedTransactions = groupByCategory(filteredTransactions);
  } else if (groupBy === "type") {
    groupedTransactions = groupByType(filteredTransactions);
  } else if (groupBy === "month") {
    groupedTransactions = groupByMonth(filteredTransactions);
  } else {
    groupedTransactions = { All: filteredTransactions };
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>
          <p className="text-sm text-gray-500">
            Manage and track your financial activities
          </p>
        </div>

        <div className="text-sm text-gray-500">
          {filteredTransactions.length} records
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-600">
                Date
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Category
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Type
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Description
              </TableHead>
              <TableHead className="font-semibold text-gray-600">
                Amount
              </TableHead>
              {role === "admin" && (
                <TableHead className="font-semibold text-gray-600">
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
                  className="text-center py-10"
                >
                  <div>
                    <p className="text-gray-500">No transactions found</p>
                    <p className="text-sm text-gray-400">
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
                      className="bg-indigo-50 text-indigo-700 font-semibold py-3"
                    >
                      {group}
                    </TableCell>
                  </TableRow>

                  {groupedTransactions[group].map((t) => (
                    <TableRow
                      key={t.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <TableCell>
                        {new Date(t.date).toLocaleDateString("en-IN")}
                      </TableCell>

                      <TableCell>{t.category}</TableCell>

                      <TableCell>
                        <Badge
                          className={
                            t.type === "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {t.type}
                        </Badge>
                      </TableCell>

                      <TableCell>{t.description}</TableCell>

                      <TableCell
                        className={`font-bold ${
                          t.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ₹{t.amount}
                      </TableCell>

                      {role === "admin" && (
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(t)}
                          >
                            Edit
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setTransactionToDelete(t);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </Button>
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
      <div className="md:hidden p-4 space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No transactions found</p>
            <p className="text-sm text-gray-400">Add your first transaction</p>
          </div>
        ) : (
          Object.keys(groupedTransactions).map((group) => (
            <div key={group} className="space-y-3">
              <h3 className="font-semibold text-indigo-600">{group}</h3>

              {groupedTransactions[group].map((t) => (
                <Card
                  key={t.id}
                  className="shadow-sm border hover:shadow-md transition"
                >
                  <CardContent className="p-4 space-y-3">
                    {/* Category & Type */}
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.category}</span>

                      <Badge
                        className={
                          t.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {t.type}
                      </Badge>
                    </div>

                    <Separator />

                    <div className="text-sm text-gray-500">
                      {new Date(t.date).toLocaleDateString("en-IN")}
                    </div>

                    <div className="text-sm text-gray-600">{t.description}</div>

                    {/* Amount */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Amount</span>

                      <span
                        className={`font-bold text-lg ${
                          t.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        ₹{t.amount}
                      </span>
                    </div>

                    {role === "admin" && (
                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(t)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
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
