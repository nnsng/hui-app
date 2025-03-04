export const formatCurrency = (value: number | string = 0) => {
  const number = Number(value);
  if (isNaN(number)) return '0 ₫';
  return number.toLocaleString('vi-VN') + ' ₫';
};
