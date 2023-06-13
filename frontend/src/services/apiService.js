import axios from 'axios';

const url = 'lift';

export const getLiftStatus = async () => {
  try {
    const data = await axios(url);
    // console.log(data);
    return data.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const addCallFloor = async ({ num: floorNum }) => {
  try {
    // console.log('num: ', floorNum);
    const data = await axios.put(`${url}/${floorNum}`);
    // console.log('!API DATA: ', data);
    return data.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const sendCallFloorDirection = async ({ floorNum, floorDirection }) => {
  // console.log('floor: ', floorNum, '\tfloorDirection: ', floorDirection);
  // floorNum, direction
  try {
    const data = await axios.put(`${url}/${floorNum}/${floorDirection}`);
    // console.log('!API DATA: ', data.data);
    return data.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const sendCurrentStatus = async ({ floorNum: num, isMovement, doorOpened: isOpened }) => {
  try {
    console.log('num: ', num, '\tisMovement: ', isMovement, '\tisOpened: ', isOpened);
    const data = await axios.post(`${url}/${num}`, {
      isMovement,
      isOpened,
    });
    console.log('!API DATA: ', data);
    return data.data;
  } catch (error) {
    console.log(error.message);
  }
};

// module.export = { getLiftStatus };
