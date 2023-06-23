import axios from 'axios';

const url = 'lift';

export const getLiftStatus = async () => {
  try {
    const data = await axios(url);
    return data.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const addCallFloor = async ({ num: floorNum }) => {
  try {
    const data = await axios.put(`${url}/${floorNum}`);
    return data.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const sendCallFloorDirection = async ({ floorNum, floorDirection }) => {
  try {
    const data = await axios.put(`${url}/${floorNum}/${floorDirection}`);
    return data.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const sendCurrentStatus = async ({ floorNum: num, isMovement, doorOpened: isOpened }) => {
  try {
    // console.log('num: ', num, '\tisMovement: ', isMovement, '\tisOpened: ', isOpened);
    const data = await axios.post(`${url}/${num}`, {
      isMovement,
      isOpened,
    });
    // console.log('!API DATA: ', data);
    return data.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
