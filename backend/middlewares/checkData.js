const { strToBoolean } = require('../helpers');

const checkData = (req, res, next) => {
  const { MIN_FLOOR } = process.env;
  const { MAX_FLOOR } = process.env;
  let { floorNum, direction } = req.params;
  let { isOpened, isMovement } = req.body;
  let isThrow = false;
  console.log(typeof MIN_FLOOR);
  // console.log(
  //   'floorNum: ',
  //   floorNum,
  //   '\tdirection: ',
  //   direction,
  //   '\tisOpened: ',
  //   isOpened,
  //   '\tisMovement: ',
  //   isMovement
  // );
  // if (direction) console.log('!!!!Direction');
  // const checkBoolean = str => {
  //   const res = strToBoolean(str);
  //   if (res === null) isThrow = true;
  //   return res;
  // };

  console.log('floorNum: ', floorNum);
  if (floorNum) {
    floorNum = Number.parseInt(floorNum);
    console.log('floorNum: ', floorNum);
    req.params.floorNum = floorNum;
    if (floorNum < Number.parseInt(MIN_FLOOR) || floorNum > Number.parseInt(MAX_FLOOR))
      isThrow = true;
  } else isThrow = true;

  // req.body.isOpened = checkBoolean(isOpened);
  // req.body.isMovement = checkBoolean(isMovement);

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
