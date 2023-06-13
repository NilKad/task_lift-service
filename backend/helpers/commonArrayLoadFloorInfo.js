const floorInfoToArray = require('./floorInfoToArray');

const commonArrayLoadFloorInfo = (array, floorInfo) => {
  return [...array, ...floorInfoToArray(floorInfo)];
};

module.exports = { commonArrayLoadFloorInfo };
