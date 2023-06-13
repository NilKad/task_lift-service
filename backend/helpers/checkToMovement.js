const { commonArrayLoadFloorInfo } = require('./commonArrayLoadFloorInfo');
const { compareFloorNumber } = require('./compareFloorNumber');
const floorInfoToArray = require('./floorInfoToArray');

const checkToMovement = (data, doorToClose = false) => {
  const { current_floor, direction, load, floor_info, movement, doors_opened } = data;
  //* floor > array.sort()[0] if 'less=true'
  //* floor < arra.sort()[lastindex] if 'less=false'
  const compare = (floor, array, less, currentDirection, doors_opened) => {
    // const isMovementUp = currentDirection === 1 ? true : false;
    if (array.length === 0) return 0;
    if (less) return floor > array.sort((a, b) => a - b)[0] ? -1 : 1;
    return floor < array.sort((a, b) => a - b)[array.length - 1] ? 1 : -1;
  };
  const findFloor = (current_floor, floor_info) => {
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
      // if (array.length === 1 && currentFloor === array[0]) return 0;
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
  // const callFromDirection = false;

  // if (movement) return direction;

  const curInfoItem = findFloor(current_floor, floor_info);
  if (load.length === 0 && floor_info.length === 0) return 0;

  //если был вызов с этажа по текущему направлению движения, вернуть текущее направление
  if (curInfoItem && checkDirFloorInfo(direction, curInfoItem)) {
    return direction;
  }
  //! ?????
  // if (direction !== 0 && !doorToClose) {
  //   return direction;
  // }

  //получить массивы без текушего этажа, чтобы выбрать следующее направление
  let directionOnThisFloor = false;

  // const nLoad = load.length > 0 ? load.filter(e => e !== current_floor) : [];

  // let nCurFloor = [...floor_info];
  // nCurFloor =
  //   nCurFloor.length > 0
  //     ? nCurFloor
  //         .map(e => {
  //           if (e.floor !== current_floor) return e;
  //           if (checkDirFloorInfo(direction, e)) directionOnThisFloor = true;
  //           return delCurFloorInFloorInfo(direction, e);
  //         })
  //         .filter(e => e !== null)
  //     : [];

  // if (nLoad.length === 0 && nCurFloor.length === 0) return 0; // ?
  // if (directionOnThisFloor) return direction; //?

  const commonArray = commonArrayLoadFloorInfo(load, floor_info);

  //двери закрыты, направления нет
  if (direction === 0) {
    // при открытых дверях мы возвращаем старое направление
    //если двери закрыты, проверка  направления
    //двери закрылись и направления нет, лифт просто вызван, и выбран этаж или направлние. Этаж имеет приоритет

    //если двери нет направления и двери закрыты, то вернуть направление
    // if (!doors_opened && !doorToClose) {
    //   return checkCurDirection(commonArray, current_floor);
    // }
    // if (!doors_opened && doorToClose) {
    //   return checkCurDirection(commonArray, current_floor);
    // }
    //* вывод их предыдущих
    if (!doors_opened) return checkCurDirection(commonArray, current_floor);
    if (doors_opened && load.length > 0) checkCurDirection(load, current_floor);
    return direction;
    // если нет направления и двери открыты
    // if (doors_opened) return checkCurDirection(commonArray, current_floor);

    // if (load.length > 0) return checkCurDirection(load, current_floor);
    // if (load.length === 0 && floor_info.length > 0)
    // return checkCurDirection(floorInfoToArray(floor_info), current_floor);
  }

  //* дальше было установел директион direction = 1/-1
  //когда сбрасывается направление
  // 1. если лифт приезжает на этаж по load и больше вызовов нет
  if ((!movement || doorToClose) && commonArray.length === 0) return 0;

  //если есть направление и дверь закрылась, то
  // проверяем по движению направления вызовы, если нет, то проверяем вызовы в другом направлении и меняем направление
  if (doorToClose && commonArray.length > 0) {
    //
    return compare(current_floor, commonArray, direction === -1 ? true : false);
  }

  // проверить есть ли по направлению для этого этажа значение, если нет изменить направление
  if (
    !movement &&
    load.length === 0 &&
    floor_info.length === 1 &&
    !checkDirFloorInfo(direction, floor_info[0])
  )
    return direction === 1 ? -1 : 1;
  //if (load.length === 0 && floor_info.length === 1 && floor_info[0].floor === current_floor)
  //   return 0;

  return direction;
  if (doorToClose && direction === 0) {
    //**********  old  */
  }

  //лифт приехал на нужный этаж и больше нет никуда вызовов, то сбросить директион

  //
  if (direction !== 0) {
    // const commonArray = [...load, ...floorInfoToArray(floor_info)];
    if (direction === -1) {
      return compare(current_floor, commonArray, true);
    } else {
      return compare(current_floor, commonArray, false);
    }
  }

  // если нет направления, и нажата кнопка в лифте, то это приоритет
  if (load.length > 0) {
    return compare(current_floor, load.length === 0 ? [] : [load[0]], true);
  }
  //иначе обработка по вызову на этаже
  return compare(
    current_floor,
    floor_info.length === 0 ? [] : [floorInfoToArray(floor_info)[0]],
    true
  );
};

module.exports = { checkToMovement };
