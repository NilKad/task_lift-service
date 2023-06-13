export const floorInfoToArray = (floorInfo, continueDir = null) => {
  if (!continueDir) return [...floorInfo].map(e => e.floor);
  // return array;
  return [...floorInfo].reduce((acc, e) => {
    if (continueDir in e) acc.push(e.floor);
    return acc;
  }, []);
};

// module.exports = floorInfoToArray;
