export const groupByCategory = (transactions) => {
  return transactions.reduce((acc, t) => {
    if (!acc[t.category]) {
      acc[t.category] = [];
    }

    acc[t.category].push(t);
    return acc;
  }, {});
};

export const groupByType = (transactions) => {
  return transactions.reduce((acc, t) => {
    if (!acc[t.type]) {
      acc[t.type] = [];
    }

    acc[t.type].push(t);
    return acc;
  }, {});
};

export const groupByMonth = (transactions) => {
  return transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString(
      "default",
      { month: "long" }
    );

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(t);
    return acc;
  }, {});
};