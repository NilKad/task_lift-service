const { checkToMovement } = require('../helpers');
const { writeStatus, getStatus } = require('../models');

const setCurrenFloor = async (floor, isOpened, isMovement) => {
  const { MIN_FLOOR } = process.env;
  const { MAX_FLOOR } = process.env;

  const data = await getStatus();
  data.current_floor = floor;

  data.movement = isMovement;
  if (isOpened) {
    data.doors_opened = true;
    // const str = data.load.toString();

    //* delete from load current floor
    const loadArray = data.load;
    data.load = loadArray.filter(e => e !== floor);

    //* check and delete current floor from floor_info
    const array = data.floor_info;
    const newArray = array.map(item => {
      if (floor !== item.floor) return item;
      if (floor === MIN_FLOOR || floor === MAX_FLOOR) return null;
      const direction = data.direction === -1 ? 'continue_down' : 'continue_up';
      if (direction in item) delete item[direction];
      if (!('continue_up' in item) && !('continue_down' in item)) return null;
      return item;
    });
    data.floor_info = newArray.filter(e => e !== null);
  } else {
    if (data.doors_opened) {
      data.direction = checkToMovement(data);
    }
    data.doors_opened = false;
  }
  return await writeStatus(data);
};

module.exports = { setCurrenFloor };
