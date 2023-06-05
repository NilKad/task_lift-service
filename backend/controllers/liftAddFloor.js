const { addFloorInLift } = require('../services');

const liftSetFloor = async (req, res) => {
  const { floorNum } = req.params;
  const data = await addFloorInLift(floorNum);
  res.status(200).json(data);
};
module.exports = liftSetFloor;
