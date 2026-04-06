export const exportTransactionsToCSV = (transactions, filename = "transactions.csv") => {
  if (!transactions || transactions.length === 0) {
    alert("No transactions to export");
    return;
  }

  const headers = ["Date", "Category", "Type", "Amount", "Description"];

  const rows = transactions.map((t) => {
    let formattedDate = t.date;
    if (t.date && t.date.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const [day, month, year] = t.date.split('-');
      formattedDate = `${year}-${month}-${day}`;
    }
    
    return [
      formattedDate,     
      t.category,        
      t.type,            
      t.amount,          
      t.description || "", 
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