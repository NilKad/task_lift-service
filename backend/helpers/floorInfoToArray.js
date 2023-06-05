const floorInfoToArray = floorInfo => {
  const array = [...floorInfo].map(e => e.floor);
  return array;
};

module.exports = floorInfoToArray;
