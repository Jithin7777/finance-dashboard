

// import React, { useState } from "react";
// import TransactionTable from "../components/transactions/TransactionTable";
// import TransactionFilter from "../components/transactions/TransactionFilter";
// import SearchBar from "../components/transactions/SearchBar";
// import EditTransactionModal from "../components/transactions/EditTransactionModal";
// import GroupTransactions from "@/components/transactions/GroupTransactions";
// import AddTransactionDialog from "../components/transactions/AddTransactionModal";
// import TransactionToolbar from "@/components/transactions/TransactionToolbar";
// const Transactions = () => {
//   const [openEdit, setOpenEdit] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);

//   const handleEdit = (transaction) => {
//     setSelectedTransaction(transaction);
//     setOpenEdit(true);
//   };

//   return (
//     <div className="space-y-6">
 
     
// {/* Add Transaction Button (only for admin) */}
// <div className="flex justify-end">
//   <AddTransactionDialog />
// </div>
//       {/* <div className="bg-white p-4 rounded-lg shadow space-y-4">

//         <div
//           className="
//             grid 
//             grid-cols-1 
//             md:grid-cols-2 
//             lg:grid-cols-3 
//             gap-4
//             items-end
//           "
//         >
//           <SearchBar />

//           <TransactionFilter />

//           <GroupTransactions />
//         </div>


//       </div> */}

//             <TransactionToolbar />


//       {/* Table */}
//       <TransactionTable onEdit={handleEdit} />

//       {/* Modal */}
//       <EditTransactionModal
//         key={selectedTransaction?.id || "modal"}
//         open={openEdit}
//         setOpen={setOpenEdit}
//         transaction={selectedTransaction}
//       />

//     </div>
//   );
// };

// export default Transactions;



// src/pages/Transactions.jsx
import React, { useState } from "react";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFilter from "../components/transactions/TransactionFilter";
import EditTransactionModal from "../components/transactions/EditTransactionModal";
import GroupTransactions from "../components/transactions/GroupTransactions";
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

      {/* Toolbar Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow dark:shadow-gray-700 space-y-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end"> */}
          {/* <TransactionFilter /> */}
          {/* <GroupTransactions /> */}
        {/* </div> */}

        <TransactionToolbar />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow dark:shadow-gray-700">
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