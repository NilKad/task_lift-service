const { checkToMovement } = require('../helpers');
const { writeStatus, getStatus } = require('../models');

const setCurrenFloor = async (floor, isOpened, isMovement) => {
  const { MIN_FLOOR } = process.env;
  const { MAX_FLOOR } = process.env;

  const data = await getStatus();
  const { floor_info, load } = data;
  data.current_floor = floor;
  data.movement = isMovement;

  let doorToClose = false;
  data.load = data.load.filter(e => e !== floor);

  if (!isOpened && data.doors_opened) {
    doorToClose = true;

    //* check and delete current floor from floor_info
    const array = data.floor_info;
    data.floor_info = floor_info
      .map(item => {
        if (floor !== item.floor) return item;
        if (floor == MIN_FLOOR || floor == MAX_FLOOR) return null;
        const direction = data.direction === -1 ? 'continue_down' : 'continue_up';
        if (data.load.length === 0) return null;
        if (direction in item) delete item[direction];
        if (!('continue_up' in item) && !('continue_down' in item)) return null;
        return item;
      })
      .filter(e => e !== null);
  }
  data.doors_opened = isOpened;
  data.direction = checkToMovement(data, doorToClose); //! ~~~~~

  return await writeStatus(data, doorToClose);
};

module.exports = { setCurrenFloor };
