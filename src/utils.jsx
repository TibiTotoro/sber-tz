export const formatDate = (date) => date.toISOString().split('T')[0];

export const formatCurrency = (cur) => (1 / cur).toFixed(2);
