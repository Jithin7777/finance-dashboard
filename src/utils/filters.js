export const filterTransactions = (
  transactions,
  search,
  type,
  category
) => {
  return transactions.filter((t) => {

    // search filter
    const matchesSearch = search
      ? t.category.toLowerCase().includes(search.toLowerCase())
      : true;

    // type filter
    const matchesType = type
      ? t.type === type
      : true;

    // category filter
    const matchesCategory = category
      ? t.category.toLowerCase().includes(category.toLowerCase())
      : true;

    return matchesSearch && matchesType && matchesCategory;
  });
};