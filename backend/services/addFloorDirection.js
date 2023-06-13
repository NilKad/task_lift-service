const { checkToMovement } = require('../helpers');
const { getStatus, writeStatus } = require('../models');

const addFloorDirection = async (floor, direction) => {
  const data = await getStatus();
  if (direction.toLowerCase() !== 'up' && direction.toLowerCase() !== 'down') return data;
  const toDirection = direction.toLowerCase() === 'up' ? 'continue_up' : 'continue_down';
  let isAdded = false;
  let isNeedAdded = true;
  const array = 'floor_info' in data ? data.floor_info : [];
  const newArray = array.map(item => {
    if (item.floor !== floor) {
      return item;
    }
    if (!(toDirection in item)) {
      item = { ...item, [toDirection]: true };
      isAdded = true;
    } else isNeedAdded = false;
    return item;
  });
  if (!isAdded && isNeedAdded) {
    newArray.push({ floor: floor, [toDirection]: true });
  }
  data.floor_info = newArray;
  if (data.direction === 0 || (data.direction !== 0 && data.floor_info.length === 1)) {
    // data.direction = checkToMovement(data); //*------
  }
  data.direction = checkToMovement(data); //!----

  // console.log('newData: ', data);
  return await writeStatus(data);
};

module.exports = { addFloorDirection };
