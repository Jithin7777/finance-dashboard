import React, { useState } from "react";
import TransactionTable from "../components/transactions/TransactionTable";
import EditTransactionModal from "../components/transactions/EditTransactionModal";
import AddTransactionDialog from "../components/transactions/AddTransactionModal";
import TransactionToolbar from "../components/transactions/TransactionToolbar";

const Transactions = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenEdit(true);
  };

  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100">
      {/* Add Transaction Button */}
      <div className="flex justify-end">
        <AddTransactionDialog />
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow dark:shadow-gray-700 space-y-4">
        <TransactionToolbar />
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow dark:shadow-gray-700">
        <TransactionTable onEdit={handleEdit} />
      </div>

      <EditTransactionModal
        key={selectedTransaction?.id || "modal"}
        open={openEdit}
        setOpen={setOpenEdit}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;
