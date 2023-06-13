export const getItemFromFloorInfo = (floorInfo, currentFloor) => {
  return floorInfo.filter(e => currentFloor !== e.floor);
};
