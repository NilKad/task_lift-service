const floorInfoToArray = require('./floorInfoToArray');

const checkToMovement = data => {
  //* floor > array.sort()[0] if 'less=true'
  //* floor < arra.sort()[lastindex] if 'less=false'
  const compare = (floor, array, less, currentDirection) => {
    // const isMovementUp = currentDirection === 1 ? true : false;
    if (less) return floor > array.sort((a, b) => a - b)[0] ? -1 : 1;
    return floor < array.sort((a, b) => a - b)[array.length - 1] ? 1 : -1;
  };

  if (data.direction !== 0) {
    if (data.load.length === 0 && data.floor_info.length === 0) return 0;
    const commonArray = [...data.load, ...floorInfoToArray(data.floor_info)];
    if (data.direction === -1) {
      return compare(data.current_floor, commonArray, true);
    } else {
      return compare(data.current_floor, commonArray, false);
    }
  }
  if (data.load.length() > 0) {
    return compare(data.current_floor, [data.load[0]], true);
  }
  return compare(
    data.current_floor,
    [floorInfoToArray(data.floor_info)[0]],
    true
  );
};

module.exports = { checkToMovement };
