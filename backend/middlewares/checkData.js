const { strToBoolean } = require('../helpers');

const checkData = (req, res, next) => {
  const { MIN_FLOOR, MAX_FLOOR } = process.env;
  // const { MAX_FLOOR } = process.env;
  let { floorNum, direction } = req.params;
  let isThrow = false;

  // console.log('floorNum: ', floorNum);
  if (floorNum) {
    floorNum = Number.parseInt(floorNum);
    req.params.floorNum = floorNum;
    if (floorNum < Number.parseInt(MIN_FLOOR) || floorNum > Number.parseInt(MAX_FLOOR))
      isThrow = true;
  } else isThrow = true;

  if (direction) {
    if (!(direction.toLowerCase() === 'up' || direction.toLowerCase() === 'down')) {
      isThrow = true;
    }
  }
  if (isThrow) {
    const error = new Error('Incorrect Data');
    error.status = 401;
    throw error;
  }
  return next();
};

module.exports = checkData;
