export const genArray = () => {
  const MIN_FLOOR = 0;
  const MAX_FLOOR = 12;

  const array = [];
  for (let i = MIN_FLOOR; i <= MAX_FLOOR; i++) {
    array.push(i);
  }
  return array;
};
