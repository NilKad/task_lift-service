const { strToBoolean } = require('../helpers');

const checkData = (req, res, next) => {
  const { MIN_FLOOR } = process.env;
  const { MAX_FLOOR } = process.env;
  let { floorNum, direction } = req.params;
  let { isOpened, isMovement } = req.query;
  let isThrow = false;

  const checkBoolean = str => {
    const res = strToBoolean(str);
    if (res === null) isThrow = true;
    return res;
  };

  if (floorNum) {
    floorNum = Number.parseInt(floorNum);
    req.params.floorNum = floorNum;
    if (floorNum < MIN_FLOOR || floorNum > MAX_FLOOR) isThrow = true;
  } else isThrow = true;

  req.query.isOpened = checkBoolean(isOpened);
  req.query.isMovement = checkBoolean(isMovement);

  if (direction) {
    if (
      !(direction.toLowerCase() === 'up' || direction.toLowerCase() === 'down')
    ) {
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
