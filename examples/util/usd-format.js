export const usdFormat = (value, fraction) => {
  if (fraction === 0) {
    return Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fraction || 2,
    maximumFractionDigits: fraction || 2
  });
};
