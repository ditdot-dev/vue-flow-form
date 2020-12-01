export const roundOff = (number, appliedNumber) => {
  return Math.round(number / (appliedNumber || 10)) * (appliedNumber || 10);
};
