export const genArray = (reverse = false, numColumn = 2, isIntLiftPanel = false) => {
  const MIN_FLOOR = 0;
  const MAX_FLOOR = 12;

  let array = [];
  for (let i = MIN_FLOOR; i <= MAX_FLOOR; i++) {
    array.push(i);
  }
  if (reverse) {
    array = [...array].sort((a, b) => b - a);
    for (let i = 0; i < array.length; i += numColumn) {
      if (i === array.length - 1) continue;
      const t = array[i];
      array[i] = array[i + numColumn - 1];
      array[i + numColumn - 1] = t;
    }
  }
  if (isIntLiftPanel) {
    // const lastElement = array.splice(10, 2);
    // array.push('open', lastElement, 'close');
    // array.push('open');
    array.splice(array.length - 1, 0, 'open');
    array.push('close');
  }
  return array;
};
