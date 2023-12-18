export const formatCurrency = currency => {
  return (Math.round(currency * 100) / 100).toFixed(2);
};
