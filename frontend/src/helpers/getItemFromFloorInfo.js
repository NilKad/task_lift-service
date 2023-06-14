export const getItemFromFloorInfo = (floorInfo, currentFloor) => {
  const res = floorInfo.filter(e => currentFloor === e.floor);
  return res.length > 0 ? res[0] : {};
};
