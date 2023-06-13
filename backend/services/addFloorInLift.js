const { checkToMovement } = require('../helpers');
const { writeStatus, getStatus } = require('../models');

const addFloorInLift = async floor => {
  const data = await getStatus();
  let load = data.load;
  if (!load.includes(floor)) {
    data.load.push(floor);
  }
  console.log('!!!!addFloorInLift data: ', data);
  if (data.direction === 0 || (data.direction !== 0 && data.load.length === 1)) {
    // const dataCheck = checkToMovement(data);
    // data.direction = checkToMovement(data);
    // console.log(dataCheck);
  }
  data.direction = checkToMovement(data); //!!---

  return await writeStatus(data);
};

module.exports = { addFloorInLift };
