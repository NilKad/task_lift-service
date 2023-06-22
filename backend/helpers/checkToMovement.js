const { commonArrayLoadFloorInfo } = require('./commonArrayLoadFloorInfo');
const { compareFloorNumber } = require('./compareFloorNumber');
const floorInfoToArray = require('./floorInfoToArray');

const checkToMovement = (data, doorToClose = false) => {
  const { MAX_FLOOR, MIN_FLOOR } = process.env;
  const { current_floor, direction, load, floor_info, movement, doors_opened } = data;
  //* floor > array.sort()[0] if 'less=true'
  //* floor < arra.sort()[lastindex] if 'less=false'
  const compare = (floor, array, less, currentDirection, doors_opened) => {
    if (array.length === 0) return 0;
    if (less) return floor > array.sort((a, b) => a - b)[0] ? -1 : 1;
    return floor < array.sort((a, b) => a - b)[array.length - 1] ? 1 : -1;
  };
  const currentFloorInFloorInfo = (current_floor, floor_info) => {
    for (const item of floor_info) {
      if (floor_info.floor === current_floor) return item;
    }
    return null;
  };
  const checkDirFloorInfo = (direction, floorInfoItem) => {
    if (direction === 1 && 'continue_up' in floorInfoItem) return true;
    if (direction === -1 && 'continue_down' in floorInfoItem) return true;
    return false;
  };
  const checkCurDirection = (array, currentFloor, direction = 0) => {
    if (direction === 0) {
      if (array.length === 0) return 0;
      if (array.length > 0) return compareFloorNumber(currentFloor, array[0]);
    } else {
    }
  };
  const delCurFloorInFloorInfo = (direction, floorInfoItem) => {
    const t = { ...floorInfoItem };
    if (direction === 1 && checkDirFloorInfo(direction, floorInfoItem)) delete t.continue_up;
    if (direction === -1 && checkDirFloorInfo(direction, floorInfoItem)) delete t.continue_down;
    if (Object.keys(t).length === 1) return null;
    return t;
  };

  const curInfoItem = currentFloorInFloorInfo(current_floor, floor_info);
  //* if no Load and FloorInfo then return Direction=0
  if (load.length === 0 && floor_info.length === 0) return 0;

  //если был вызов с этажа по текущему направлению движения, вернуть текущее направление
  //! !!!!
  if (curInfoItem && checkDirFloorInfo(direction, curInfoItem)) {
    return direction;
  }

  //получить массивы без текушего этажа, чтобы выбрать следующее направление
  let directionOnThisFloor = false;

  const commonArray = commonArrayLoadFloorInfo(load, floor_info);

  //двери закрыты, направления нет
  if (direction === 0) {
    //* вывод их предыдущих
    if (!doors_opened) return checkCurDirection(commonArray, current_floor);
    if (doors_opened && load.length > 0) checkCurDirection(load, current_floor);
    return direction;
  }

  //* дальше было установел директион direction = 1/-1
  //когда сбрасывается направление
  // 1. если лифт приезжает на этаж по load и больше вызовов нет
  //! проверить нужно ли
  if ((!movement || doorToClose) && commonArray.length === 0) return 0;

  //если есть направление и дверь закрылась, то
  // проверяем по движению направления вызовы, если нет, то проверяем вызовы в другом направлении и меняем направление
  if (doorToClose && commonArray.length > 0) {
    return compare(current_floor, commonArray, direction === -1 ? true : false);
  }

  // проверить есть ли по направлению для этого этажа значение, если нет изменить направление
  if (
    !movement &&
    load.length === 0 &&
    floor_info.length === 1 &&
    !checkDirFloorInfo(direction, floor_info[0])
  ) {
    return direction === 1 ? -1 : 1;
  }

  if (current_floor == MAX_FLOOR) return -1;
  if (current_floor == MIN_FLOOR) return 1;
  return direction;
};

module.exports = { checkToMovement };
