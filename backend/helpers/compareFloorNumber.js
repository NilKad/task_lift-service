const compareFloorNumber = (currentFloor, callFloor) => {
  if (currentFloor === callFloor) return 0;
  return currentFloor > callFloor ? -1 : 1;
};

module.exports = { compareFloorNumber };
