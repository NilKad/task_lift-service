import {
  addCallFloor,
  getLiftStatus,
  sendCallFloorDirection,
  sendCurrentStatus,
} from '../services/apiService';

export const useAPI = cb => {
  let data = null;
  const checkErrorAndCallBack = dataIn => {
    if ('name' in dataIn) {
      console.log('!!!!!! MY HOOK Error data: ', dataIn.code);
      return;
    }
    // console.log('!!!!!! MY HOOK Not Error');
    cb(dataIn);
    // return false;
  };
  const getApiStatus = async () => {
    data = await getLiftStatus();
    // console.log('!!!!!! MY HOOK data: ', data);
    checkErrorAndCallBack(data);
  };

  const addApiCallFloor = async num => {
    data = await addCallFloor({ num });
    checkErrorAndCallBack(data);
  };

  const sendApiCallFloorDirection = async (floorNum, floorDirection) => {
    data = await sendCallFloorDirection({ floorNum, floorDirection });
    checkErrorAndCallBack(data);
  };

  const sendApiCurrentStatus = async ({ floorNum, isMovement, doorOpened }) => {
    data = await sendCurrentStatus({ floorNum, isMovement, doorOpened });
    checkErrorAndCallBack(data);
  };

  return { getApiStatus, addApiCallFloor, sendApiCallFloorDirection, sendApiCurrentStatus };
};
