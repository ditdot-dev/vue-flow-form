export const compareTwoObjects = (first, second) => {
  return Object.keys(first).every(item => first[item] === second[item]);
};
