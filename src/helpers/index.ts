export const formatToMoney = (number: string): string => {
  return Number(number).toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
  });
};
