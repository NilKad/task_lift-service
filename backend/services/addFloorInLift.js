const { writeStatus, getStatus } = require('../models');

const addFloorInLift = async floor => {
  const data = await getStatus();
  let load = data.load;
  if (!load.includes(floor)) {
    data.load.push(floor);
  }
  return await writeStatus(data);
};

module.exports = { addFloorInLift };
