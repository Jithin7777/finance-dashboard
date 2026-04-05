// src/utils/exportCSV.js
export const exportTransactionsToCSV = (transactions, filename = "transactions.csv") => {
  if (!transactions || transactions.length === 0) {
    alert("No transactions to export");
    return;
  }

  // Headers in new order
  const headers = ["Date", "Category", "Type", "Amount", "Description"];

  const rows = transactions.map((t) => {
    let formattedDate = t.date;
    if (t.date && t.date.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [day, month, year] = t.date.split('-');
      formattedDate = `${year}-${month}-${day}`;
    }
    
    return [
      formattedDate,     // Date first
      t.category,        // Category
      t.type,            // Type
      t.amount,          // Amount
      t.description || "", // Description
    ].map((val) => `"${val}"`).join(",");
  });

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};